const express = require("express");
const router = express.Router();

const {pfpupload} = require("../middlewares/multer")
const verifytoken = require("../middlewares/validate")
const { getuser, getusers, updateuser, deleteuser } = require("../controllers/usercontroller")

router.get("/", getusers)
router.get("/user", verifytoken, getuser)
// router.get("/user/:id", getuser)
router.put("/user/:id", verifytoken, pfpupload.single("pfp"),  updateuser)
router.delete("/user/:id", verifytoken, deleteuser)

module.exports = router