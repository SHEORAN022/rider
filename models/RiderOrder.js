// const mongoose = require("mongoose");

// const riderOrderSchema = new mongoose.Schema(
//   {
//     restaurant: {
//       type: String,
//       required: true,
//     },

//     items: {
//       type: String,
//       required: true,
//     },

//     pickup: {
//       type: String,
//       required: true,
//     },

//     drop: {
//       type: String,
//       required: true,
//     },

//     payout: {
//       type: String,
//       required: true,
//     },

//     timeLeft: {
//       type: String,
//       default: "20 min",
//     },

//     customerName: {
//       type: String,
//       required: true,
//     },

//     distance: {
//       type: String,
//       default: "0 KM",
//     },

//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "accepted",
//         "rejected",
//       ],
//       default: "pending",
//     },

//     riderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Rider",
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model(
//   "RiderOrder",
//   riderOrderSchema
// );

const mongoose = require("mongoose");

const riderOrderSchema = new mongoose.Schema(
  {
    orderId: {
  type: String,
  required: true,
},

type: {
  type: String,
  enum: [
    "pharmacy",
    "pet",
    "lab",
  ],
  required: true,
},
    restaurant: {
      type: String,
      required: true,
    },

    items: {
      type: String,
      required: true,
    },

    pickup: {
      type: String,
      required: true,
    },

    drop: {
      type: String,
      required: true,
    },

    payout: {
      type: String,
      required: true,
    },

    timeLeft: {
      type: String,
      default: "20 min",
    },

    customerName: {
      type: String,
      required: true,
    },

    distance: {
      type: String,
      default: "0 KM",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "pickedup",
        "delivered",
        "rejected",
      ],
      default: "pending",
    },

    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      default: null,
    },

    // Pickup Photos
    pickupPhotos: [
      {
        url: String,
        fileName: String,
      },
    ],

    // Delivery Photos
    deliveryPhotos: [
      {
        url: String,
        fileName: String,
      },
    ],

    pickupTime: {
      type: Date,
      default: null,
    },

    deliveredTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "RiderOrder",
  riderOrderSchema
);