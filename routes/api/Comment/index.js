const router = require("express").Router();
const commentRoutes = require("./Comment");

router.use("/", commentRoutes);

module.exports = router;