const router = require("express").Router();
const paymentRoutes = require("./payment");

router.use("/", paymentRoutes);

// const paymentApi = require('./payment');

// const configureRoutes = app => {
//   paymentApi(app);
// };


module.exports = router;