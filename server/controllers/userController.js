import { Webhook } from "svix";
import Stripe from "stripe";

import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";

//GLOBAL VARIABLES
const currency = "usd";

//GET WAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

export const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await userModel.create(userData);
        res.json({});

        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await userModel.findByIdAndUpdate({ clerkId: data.id }, userData);
        res.json({});

        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});

        break;
      }

      default:
        break;
    }
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;

    const userData = await userModel.findOne({ clerkId });

    res.json({ success: true, credits: userData.creditBalance });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

export const userPayment = async (req, res) => {
  try {
    const { clerkId, planId } = req.body;
    const { origin } = req.headers;

    if (!clerkId || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Plan not found!" });
    }

    date = new Date();

    const transactionData = {
      userId: clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = new transactionModel(transactionData);
    await newTransaction.save();

    const line_items = [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: newTransaction.plan,
          },
          unit_amount: newTransaction.amount * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&transactionId=${newTransaction._id}`,
      cancel_url: `${origin}/verify?success=false&transactionId=${newTransaction._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

export const verifyStripe = async (req, res) => {
  const { transactionId, success, clerkId } = req.body;

  try {
    if (success === "true") {
      const transactionData = await transactionModel.findById(transactionId);
      const user = await userModel.findOne({ clerkId });

      const creditBalance = user.creditBalance + transactionData.credits;
      await userModel.findOneAndUpdate({ clerkId }, { creditBalance });

      await transactionModel.findByIdAndUpdate(transactionId, {
        payment: true,
      });

      res.json({ success: true, message: "Credit Added" });
    } else {
      res.json({ success: false, message: "Payment Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
