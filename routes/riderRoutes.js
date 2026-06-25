const express = require("express");
const router = express.Router();

const {
  registerRider,
  loginRider,
  getAllRiders,
} = require("../controllers/riderController");

router.post("/register", registerRider);
router.post("/login", loginRider);
router.get("/", getAllRiders);

module.exports = router;