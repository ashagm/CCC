const router = require("express").Router();
const newsRoutes = require("./News");

router.use("/", newsRoutes);

module.exports = router;