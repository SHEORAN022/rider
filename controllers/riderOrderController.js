
const axios = require("axios");
const RiderOrder = require("../models/RiderOrder");
const uploadToBunny = require("../utils/bunnyUpload");
/* ==========================================
GET ALL RIDER ORDERS
========================================== */
// const getRiderOrders = async (req, res) => {
// try {
// const [
// pharmacyRes,
// petRes,
// labRes,
// ] = await Promise.all([
// axios.get(
// "https://sandeeplabmanagement.onrender.com/api/pharmacy-orders/all-orders"
// ),
// axios.get(
// "https://sandeeplabmanagement.onrender.com/api/management-pet-orders/all-orders"
// ),
// axios.get(
// "https://sandeeplabmanagement.onrender.com/api/booking-lab/all-orders"
// ),
// ]);


// const pharmacyOrders =
//   pharmacyRes?.data?.data || [];

// const petOrders =
//   petRes?.data?.data || [];

// const labOrders =
//   labRes?.data?.data || [];

// /* ==========================
//    PHARMACY ORDERS
// ========================== */
// const pharmacyData =
//   pharmacyOrders.map((order) => ({
//     id: order._id,

//     restaurant: "Pharmacy",

//     items:
//       order.items?.length > 0
//         ? order.items
//             .map(
//               (item) =>
//                 `${item.name} x${item.quantity || item.qty || 1}`
//             )
//             .join(", ")
//         : "No Items",

//     pickup: "Pharmacy Store",

//     drop:
//       order.deliveryAddress ||
//       order.address ||
//       "",

//     payout: `₹${order.totalAmount || order.total || 0}`,

//     timeLeft: "20 min",

//     customerName:
//       order.user?.name ||
//       order.patient ||
//       "Customer",

//     distance: "2 KM",

//     type: "pharmacy",

//     status:
//       order.orderStatus === "CONFIRMED" ||
//       order.status === "Accepted"
//         ? "accepted"
//         : order.orderStatus === "CANCELLED" ||
//           order.status === "Cancelled"
//         ? "rejected"
//         : "pending",
//   }));

// /* ==========================
//    PET ORDERS
// ========================== */
// const petData =
//   petOrders.map((order) => ({
//     id: order._id,

//     restaurant: "Pet Store",

//     items:
//       order.items?.length > 0
//         ? order.items
//             .map(
//               (item) =>
//                 `${item.name} x${item.quantity || 1}`
//             )
//             .join(", ")
//         : "No Items",

//     pickup: "Pet Store",

//     drop:
//       order.deliveryAddress || "",

//     payout: `₹${order.totalAmount || 0}`,

//     timeLeft: "20 min",

//     customerName:
//       order.user?.name ||
//       "Customer",

//     distance: "2 KM",

//     type: "pet",

//     status:
//       order.orderStatus === "CONFIRMED"
//         ? "accepted"
//         : order.orderStatus === "CANCELLED"
//         ? "rejected"
//         : "pending",
//   }));

// /* ==========================
//    LAB BOOKINGS
// ========================== */
// const labData =
//   labOrders.map((booking) => ({
//     id: booking._id,

//     restaurant: "Lab Booking",

//     items:
//       booking.testName ||
//       "Lab Test",

//     pickup:
//       booking.sampleCollectionType ===
//       "Home"
//         ? "Home Collection"
//         : "Lab Visit",

//     drop:
//       booking.user?.address ||
//       "Patient Address",

//     payout: `₹${booking.price || 0}`,

//     timeLeft: "30 min",

//     customerName:
//       booking.user?.fullName ||
//       booking.user?.name ||
//       "Patient",

//     distance: "3 KM",

//     type: "lab",

//     status:
//       booking.status === "Confirmed"
//         ? "accepted"
//         : booking.status === "Cancelled"
//         ? "rejected"
//         : "pending",
//   }));

// const orders = [
//   ...pharmacyData,
//   ...petData,
//   ...labData,
// ];

// return res.status(200).json({
//   success: true,
//   count: orders.length,
//   orders,
// });


// } catch (error) {
// console.log(
// "Rider Orders Error =>",
// error.response?.data ||
// error.message
// );


// return res.status(500).json({
//   success: false,
//   message:
//     error.response?.data?.message ||
//     error.message,
// });


// }
// };

const getRiderOrders = async (req, res) => {
  try {

    // Delivered Orders
    const deliveredOrders =
      await RiderOrder.find({
        status: "delivered",
      });

    const deliveredIds =
      deliveredOrders.map(
        (item) => item.orderId
      );

    const [
      pharmacyRes,
      petRes,
      labRes,
    ] = await Promise.all([
      axios.get(
        "https://sandeeplabmanagement.onrender.com/api/pharmacy-orders/all-orders"
      ),
      axios.get(
        "https://sandeeplabmanagement.onrender.com/api/management-pet-orders/all-orders"
      ),
      axios.get(
        "https://sandeeplabmanagement.onrender.com/api/booking-lab/all-orders"
      ),
    ]);

    const pharmacyOrders =
      pharmacyRes?.data?.data || [];

    const petOrders =
      petRes?.data?.data || [];

    const labOrders =
      labRes?.data?.data || [];

    /* ==========================
       PHARMACY ORDERS
    ========================== */
    const pharmacyData =
      pharmacyOrders
        .filter(
          (order) =>
            !deliveredIds.includes(
              order._id.toString()
            )
        )
        .map((order) => ({
          id: order._id,

          restaurant: "Pharmacy",

          items:
            order.items?.length > 0
              ? order.items
                  .map(
                    (item) =>
                      `${item.name} x${item.quantity || item.qty || 1}`
                  )
                  .join(", ")
              : "No Items",

          pickup: "Pharmacy Store",

          drop:
            order.deliveryAddress ||
            order.address ||
            "",

          payout: `₹${order.totalAmount || order.total || 0}`,

          timeLeft: "20 min",

          customerName:
            order.user?.name ||
            order.patient ||
            "Customer",

          distance: "2 KM",

          type: "pharmacy",

          status:
            order.orderStatus === "CONFIRMED" ||
            order.status === "Accepted"
              ? "accepted"
              : order.orderStatus === "CANCELLED" ||
                order.status === "Cancelled"
              ? "rejected"
              : "pending",
        }));

    /* ==========================
       PET ORDERS
    ========================== */
    const petData =
      petOrders
        .filter(
          (order) =>
            !deliveredIds.includes(
              order._id.toString()
            )
        )
        .map((order) => ({
          id: order._id,

          restaurant: "Pet Store",

          items:
            order.items?.length > 0
              ? order.items
                  .map(
                    (item) =>
                      `${item.name} x${item.quantity || 1}`
                  )
                  .join(", ")
              : "No Items",

          pickup: "Pet Store",

          drop:
            order.deliveryAddress || "",

          payout: `₹${order.totalAmount || 0}`,

          timeLeft: "20 min",

          customerName:
            order.user?.name ||
            "Customer",

          distance: "2 KM",

          type: "pet",

          status:
            order.orderStatus === "CONFIRMED"
              ? "accepted"
              : order.orderStatus === "CANCELLED"
              ? "rejected"
              : "pending",
        }));

    /* ==========================
       LAB BOOKINGS
    ========================== */
    const labData =
      labOrders
        .filter(
          (booking) =>
            !deliveredIds.includes(
              booking._id.toString()
            )
        )
        .map((booking) => ({
          id: booking._id,

          restaurant: "Lab Booking",

          items:
            booking.testName ||
            "Lab Test",

          pickup:
            booking.sampleCollectionType ===
            "Home"
              ? "Home Collection"
              : "Lab Visit",

          drop:
            booking.user?.address ||
            "Patient Address",

          payout: `₹${booking.price || 0}`,

          timeLeft: "30 min",

          customerName:
            booking.user?.fullName ||
            booking.user?.name ||
            "Patient",

          distance: "3 KM",

          type: "lab",

          status:
            booking.status === "Confirmed"
              ? "accepted"
              : booking.status === "Cancelled"
              ? "rejected"
              : "pending",
        }));

    const orders = [
      ...pharmacyData,
      ...petData,
      ...labData,
    ];

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    console.log(
      "Rider Orders Error =>",
      error.response?.data ||
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message,
    });

  }
};



/* ==========================================
   ACCEPT ORDER
========================================== */

// const acceptOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { type } = req.body;

//     if (!type) {
//       return res.status(400).json({
//         success: false,
//         message: "Order type is required",
//       });
//     }

//     let response;
//     let pickup = "";
//     let drop = "";

//     switch (type) {
//       case "pharmacy":
//         response = await axios.put(
//           `https://sandeeplabmanagement.onrender.com/api/pharmacy-orders/rider-accept/${id}`,
//           {
//             riderId: req.rider._id,
//           }
//         );

//         pickup = "Pharmacy Store";
//         drop =
//           response?.data?.data?.deliveryAddress ||
//           response?.data?.data?.address ||
//           "Pharmacy Address";
//         break;

//       case "pet":
//         response = await axios.put(
//           `https://sandeeplabmanagement.onrender.com/api/management-pet-orders/rider-accept/${id}`,
//           {
//             riderId: req.rider._id,
//           }
//         );

//         pickup = "Pet Store";
//         drop =
//           response?.data?.data?.deliveryAddress ||
//           "Customer Address";
//         break;

//       case "lab":
//         response = await axios.put(
//           `https://sandeeplabmanagement.onrender.com/api/booking-lab/rider-accept/${id}`,
//           {
//             riderId: req.rider._id,
//           }
//         );

//         pickup = "Home Collection";
//         drop =
//           response?.data?.data?.address ||
//           response?.data?.data?.user?.address ||
//           "Patient Address";
//         break;

//       default:
//         return res.status(400).json({
//           success: false,
//           message: "Invalid order type",
//         });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Order accepted successfully",

//       orderId: id,
//       type,

//       riderId: req.rider._id,
//       riderName: req.rider.name,

//       pickup,
//       drop,

//       status: "accepted",

//       data: response?.data?.data || response?.data,
//     });

//   } catch (error) {
//     console.log(
//       "Accept Order Error =>",
//       error.response?.data || error.message
//     );

//     return res.status(
//       error.response?.status || 500
//     ).json({
//       success: false,
//       message:
//         error.response?.data?.message ||
//         error.message,
//     });
//   }
// };

const acceptOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Order type is required",
      });
    }

    let response;
    let pickup = "";
    let drop = "";

    switch (type) {

      case "pharmacy":

        response = await axios.put(
          `https://sandeeplabmanagement.onrender.com/api/pharmacy-orders/rider-accept/${id}`,
          {
            riderId: req.rider._id,
          }
        );

        pickup = "Pharmacy Store";

        drop =
          response?.data?.data?.deliveryAddress ||
          response?.data?.data?.address ||
          "Pharmacy Address";

        break;

      case "pet":

        response = await axios.put(
          `https://sandeeplabmanagement.onrender.com/api/management-pet-orders/rider-accept/${id}`,
          {
            riderId: req.rider._id,
          }
        );

        pickup = "Pet Store";

        drop =
          response?.data?.data?.deliveryAddress ||
          "Customer Address";

        break;

      case "lab":

        response = await axios.put(
          `https://sandeeplabmanagement.onrender.com/api/booking-lab/rider-accept/${id}`,
          {
            riderId: req.rider._id,
          }
        );

        pickup = "Home Collection";

        drop =
          response?.data?.data?.address ||
          response?.data?.data?.user?.address ||
          "Patient Address";

        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid order type",
        });
    }

    const orderData =
      response?.data?.data || {};

    // CREATE RIDER ORDER
    // const riderOrder =
    //   await RiderOrder.create({

    //     restaurant:
    //       type === "pharmacy"
    //         ? "Pharmacy"
    //         : type === "pet"
    //         ? "Pet Store"
    //         : "Lab Booking",

    //     items:
    //       orderData?.items?.length > 0
    //         ? orderData.items
    //             .map(
    //               (item) =>
    //                 `${item.name} x${item.quantity || item.qty || 1}`
    //             )
    //             .join(", ")
    //         : "Order",

    //     pickup,

    //     drop,

    //     payout: `₹${
    //       orderData.totalAmount ||
    //       orderData.total ||
    //       orderData.price ||
    //       0
    //     }`,

    //     customerName:
    //       orderData.patient ||
    //       orderData.user?.name ||
    //       orderData.user?.fullName ||
    //       "Customer",

    //     riderId: req.rider._id,

    //     status: "accepted",
    //   });

    const riderOrder =
  await RiderOrder.create({

    orderId: id,

    type: type,

    restaurant:
      type === "pharmacy"
        ? "Pharmacy"
        : type === "pet"
        ? "Pet Store"
        : "Lab Booking",

    items:
      orderData?.items?.length > 0
        ? orderData.items
            .map(
              (item) =>
                `${item.name} x${item.quantity || item.qty || 1}`
            )
            .join(", ")
        : "Order",

    pickup,

    drop,

    payout: `₹${
      orderData.totalAmount ||
      orderData.total ||
      orderData.price ||
      0
    }`,

    customerName:
      orderData.patient ||
      orderData.user?.name ||
      orderData.user?.fullName ||
      "Customer",

    riderId: req.rider._id,

    status: "accepted",

    pickupPhotos: [],

    deliveryPhotos: [],
  });

    return res.status(200).json({
      success: true,
      message: "Order accepted successfully",

      orderId: id,

      riderOrderId:
        riderOrder._id,

      type,

      riderId:
        req.rider._id,

      riderName:
        req.rider.name,

      pickup,

      drop,

      status: "accepted",

      data: orderData,
    });

  } catch (error) {

    console.log(
      "Accept Order Error =>",
      error.response?.data ||
      error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message,
    });

  }
};
/* ==========================================
   REJECT ORDER
========================================== */
// const rejectOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { type } = req.body;

//     if (!type) {
//       return res.status(400).json({
//         success: false,
//         message: "Order type is required",
//       });
//     }

//     let response;

//     switch (type) {
//       case "pharmacy":
//         response = await axios.put(
//           `https://sandeeplabmanagement.onrender.com/api/pharmacy-orders/rider-reject/${id}`,
//           {
//             status: "Cancelled",
//             riderId: req.rider?._id,
//           }
//         );
//         break;

//       case "pet":
//         response = await axios.put(
//           `https://sandeeplabmanagement.onrender.com/api/management-pet-orders/rider-reject/${id}`,
//           {
//             riderId: req.rider?._id,
//           }
//         );
//         break;

//       case "lab":
//         response = await axios.put(
//           `https://sandeeplabmanagement.onrender.com/api/booking-lab/rider-reject/${id}`,
//           {
//             riderId: req.rider?._id,
//           }
//         );
//         break;

//       default:
//         return res.status(400).json({
//           success: false,
//           message: "Invalid order type",
//         });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Order rejected successfully",
//       orderId: id,
//       type,
//       riderId: req.rider?._id,
//       riderName: req.rider?.name,
//       status: "rejected",
//       data: response?.data || {},
//     });

//   } catch (error) {
//     console.log("Reject Order Error:", error);

//     return res.status(
//       error.response?.status || 500
//     ).json({
//       success: false,
//       message:
//         error.response?.data?.message ||
//         error.message,
//     });
//   }
// };

/* ==========================================
   REJECT ORDER
========================================== */
const rejectOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Order type is required",
      });
    }

    let response;
    let pickup = "";
    let drop = "";

    switch (type) {
      case "pharmacy":
        response = await axios.put(
          `https://sandeeplabmanagement.onrender.com/api/pharmacy-orders/rider-reject/${id}`,
          {
            riderId: req.rider._id,
          }
        );

        pickup = "Pharmacy Store";
        drop =
          response?.data?.data?.deliveryAddress ||
          response?.data?.data?.address ||
          "Pharmacy Address";
        break;

      case "pet":
        response = await axios.put(
          `https://sandeeplabmanagement.onrender.com/api/management-pet-orders/rider-reject/${id}`,
          {
            riderId: req.rider._id,
          }
        );

        pickup = "Pet Store";
        drop =
          response?.data?.data?.deliveryAddress ||
          "Customer Address";
        break;

      case "lab":
        response = await axios.put(
          `https://sandeeplabmanagement.onrender.com/api/booking-lab/rider-reject/${id}`,
          {
            riderId: req.rider._id,
          }
        );

        pickup = "Home Collection";
        drop =
          response?.data?.data?.address ||
          response?.data?.data?.user?.address ||
          "Patient Address";
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid order type",
        });
    }

    return res.status(200).json({
      success: true,
      message: "Order rejected successfully",

      orderId: id,
      type,

      riderId: req.rider._id,
      riderName: req.rider.name,

      pickup,
      drop,

      status: "rejected",

      data: response?.data?.data || response?.data,
    });

  } catch (error) {
    console.log(
      "Reject Order Error =>",
      error.response?.data || error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message,
    });
  }
  };
  /* ==========================================
   PICKUP ORDER
========================================== */
const pickupOrder = async (req, res) => {
  try {

    const order = await RiderOrder.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      !req.files ||
      req.files.length < 2
    ) {
      return res.status(400).json({
        success: false,
        message: "Upload 2 pickup photos",
      });
    }

    const photos = [];

    for (const file of req.files) {

      const uploaded =
        await uploadToBunny(
          file,
          "pickup-orders"
        );

      photos.push(uploaded);
    }

    order.pickupPhotos = photos;
    order.pickupTime = new Date();
    order.status = "pickedup";

    await order.save();


    // ==========================================
// UPDATE ORIGINAL ORDER
// ==========================================

switch (order.type) {

 case "pharmacy":
  await axios.put(
    `https://sandeeplabmanagement.onrender.com/api/pharmacy-orders/rider-pickup/${order.orderId}`
  );
  break;

case "pet":
  await axios.put(
    `https://sandeeplabmanagement.onrender.com/api/management-pet-orders/rider-pickup/${order.orderId}`
  );
  break;

case "lab":
  await axios.put(
    `https://sandeeplabmanagement.onrender.com/api/booking-lab/rider-pickup/${order.orderId}`
  );
  break;

}
    return res.status(200).json({
      success: true,
      message: "Pickup completed",
      order,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


/* ==========================================
   DELIVER ORDER
========================================== */
const deliveredOrder = async (req, res) => {
  try {

    const order = await RiderOrder.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      !req.files ||
      req.files.length < 2
    ) {
      return res.status(400).json({
        success: false,
        message: "Upload 2 delivery photos",
      });
    }

    const photos = [];

    for (const file of req.files) {

      const uploaded =
        await uploadToBunny(
          file,
          "delivery-orders"
        );

      photos.push(uploaded);
    }

    order.deliveryPhotos = photos;
    order.deliveredTime = new Date();
    order.status = "delivered";

    await order.save();

    switch (order.type) {

 case "pharmacy":
  await axios.put(
    `https://sandeeplabmanagement.onrender.com/api/pharmacy-orders/rider-delivered/${order.orderId}`
  );
  break;

case "pet":
  await axios.put(
    `https://sandeeplabmanagement.onrender.com/api/management-pet-orders/rider-delivered/${order.orderId}`
  );
  break;

case "lab":
  await axios.put(
    `https://sandeeplabmanagement.onrender.com/api/booking-lab/rider-delivered/${order.orderId}`
  );
  break;

}

    return res.status(200).json({
      success: true,
      message: "Order delivered successfully",
      order,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



/* ==========================================
   MY COMPLETED ORDERS
========================================== */
const getMyCompletedOrders = async (req, res) => {
  try {

    const orders =
      await RiderOrder.find({
        riderId: req.rider._id,
        status: "delivered",
      }).sort({
        deliveredTime: -1,
      });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================
   ALL COMPLETED ORDERS
========================================== */
const getAllCompletedOrders = async (req, res) => {
  try {

    const orders =
      await RiderOrder.find({
        status: "delivered",
      })
      .populate(
        "riderId",
        "name email phone"
      )
      .sort({
        deliveredTime: -1,
      });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getRiderOrders,
  acceptOrder,
  rejectOrder,
  pickupOrder,
  deliveredOrder,

  getMyCompletedOrders,
  getAllCompletedOrders,
};


