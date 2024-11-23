import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorize! Login again.",
      });
    }

    const token_decode = jwt.decode(token);
    req.body.clerkId = token_decode.clerkId;

    next();
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

export default authUser;
