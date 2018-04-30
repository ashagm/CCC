const router = require("express").Router();
const serviceRoutes = require("./service");

router.use("/", serviceRoutes);

module.exports = router;