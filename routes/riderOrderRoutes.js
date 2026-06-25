// const express = require("express");
// const router = express.Router();

// const riderAuth = require(
//   "../middleware/riderAuth"
// );

// const {
//   getRiderOrders,
//   acceptOrder,
//   rejectOrder,
// } = require(
//   "../controllers/riderOrderController"
// );

// router.get(
//   "/orders",
//   getRiderOrders
// );

// router.put(
//   "/orders/accept/:id",
//   riderAuth,
//   acceptOrder
// );

// router.put(
//   "/orders/reject/:id",
//   riderAuth,
//   rejectOrder
// );

// module.exports = router;


const express = require("express");
const router = express.Router();

const riderAuth = require("../middleware/riderAuth");
const upload = require("../middleware/upload");

const {
  getRiderOrders,
  acceptOrder,
  rejectOrder,
  pickupOrder,
  deliveredOrder,
  getMyCompletedOrders,
  getAllCompletedOrders,
} = require("../controllers/riderOrderController");

router.get(
  "/orders",
  getRiderOrders
);

router.get(
  "/orders/completed",
  riderAuth,
  getMyCompletedOrders
);

router.get(
  "/orders/completed/all",
  getAllCompletedOrders
);

router.put(
  "/orders/accept/:id",
  riderAuth,
  acceptOrder
);

router.put(
  "/orders/reject/:id",
  riderAuth,
  rejectOrder
);

router.put(
  "/orders/pickup/:id",
  riderAuth,
  upload.array("photos", 2),
  pickupOrder
);

router.put(
  "/orders/delivered/:id",
  riderAuth,
  upload.array("photos", 2),
  deliveredOrder
);

module.exports = router;