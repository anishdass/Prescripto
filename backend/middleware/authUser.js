import jwt from "jsonwebtoken";

// User authentication middleware

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Login Again" });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    req.body = req.body || {};
    req.body.userId = tokenDecode.id;

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
