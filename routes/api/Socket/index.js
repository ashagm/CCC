const router = require("express").Router();
const socketRoutes = require("./socket");

router.use("/", socketRoutes);

module.exports = router;