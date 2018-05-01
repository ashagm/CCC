const router = require("express").Router();
const commentRoutes = require("./comment");

router.use("/", commentRoutes);

module.exports = router;