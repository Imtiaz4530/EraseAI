import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { assets, plans } from "../assets/assets";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";

const BuyCredit = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const { getToken } = useAuth();

  const { backendUrl } = useContext(AppContext);

  const payment = async (planId) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-stripe`,
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] mb-10 pt-14 text-center">
      <button className="border border-gray-200 text-white px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-white bg-clip-text text-transparent mb-6 sm:mb-10">
        Choose the plan that&apos;s right for you.
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, i) => (
          <div
            key={i}
            className="bg-slate-700 drop-shadow-sm border rounded-lg py-12 px-8 text-gray-300 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} width={45} alt="" />
            <p className="mt-3 font-semibold text-white">{item.id}</p>
            <p className="text-sm ">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span>/{" "}
              {item.credits} credit
            </p>
            <button
              onClick={() => payment(item.id)}
              className="w-full bg-gray-900 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 "
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
