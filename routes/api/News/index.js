const router = require("express").Router();
const newsRoutes = require("./news");

router.use("/", newsRoutes);

module.exports = router;