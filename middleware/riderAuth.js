const jwt = require("jsonwebtoken");
const Rider = require("../models/Rider");

const riderAuth = async (req, res, next) => {
  try {

    console.log("HEADERS =>", req.headers);
    console.log(
      "AUTHORIZATION =>",
      req.headers.authorization
    );

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token =
        req.headers.authorization.split(" ")[1];
    }

    console.log("TOKEN =>", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED =>", decoded);

    const rider = await Rider.findById(
      decoded.id
    ).select("-password");

    if (!rider) {
      return res.status(401).json({
        success: false,
        message: "Rider not found",
      });
    }

    req.rider = rider;

    next();

  } catch (error) {
    console.log(
      "AUTH ERROR =>",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = riderAuth;