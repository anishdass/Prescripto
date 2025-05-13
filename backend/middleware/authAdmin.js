import jwt from "jsonwebtoken";

// Admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    console.log(req.headers);
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: "Login Again" });
    }
    const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (!tokenDecode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Login Again" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
