import jwt from "jsonwebtoken";

// Admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: "Login Again" });
    }
    const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);

    console.log(tokenDecode);
    req.body = req.body || {};
    req.body.adminId = tokenDecode.id;

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
