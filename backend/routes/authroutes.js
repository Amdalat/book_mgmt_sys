const express = require("express")
const router = express.Router()

const {pfpupload} = require('../middlewares/multer');

const { signin, signup, logout } = require("../controllers/authcontroller")

router.post("/signup", pfpupload.single("pfp"), signup)
router.post("/signin", signin)
router.post("/logout", logout)


module.exports = router