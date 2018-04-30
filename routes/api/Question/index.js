const router = require("express").Router();
const questionRoutes = require("./question");

router.use("/", questionRoutes);

module.exports = router;