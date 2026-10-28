const express = require("express");
const router = express.Router();
const {bookupload} = require("../middlewares/multer")

const { createbook, getbook, getbooks, getbooksbyname, getbooksbyauthor, getbooksuploaded, updatebook, deletebook } = require("../controllers/bookcontroller")
const { addtolibrary, getlibrarybook, getlibrary, removefromlibrary } = require("../controllers/librarycontroller")
const { sendrequest, getrequest, getauthorrequests, getuserrequests, acceptrequest, rejectrequest, withdrawrequest } = require("../controllers/requestcontroller")

const verifytoken = require("../middlewares/validate")

router.post("/", verifytoken, bookupload.fields([
    {name:"bookfile", maxCount:1},
    {name:"bookcover", maxCount:1}
]), createbook)
// router.post("/", verifytoken, bookupload.single("bookfile"), createbook)
router.get("/", getbooks)
router.get("/book/:id", getbook)
router.get("/search", getbooksbyname)
router.get("/book/author/:author", getbooksbyauthor)
router.put("/book/:id", verifytoken, bookupload.single("bookfile"), updatebook)
router.delete("/book/:id", verifytoken, deletebook)

router.get("/upload", verifytoken, getbooksuploaded)

router.post("/book/:id", verifytoken, addtolibrary)
router.get("/library/:book", verifytoken, getlibrarybook)
router.get("/library", verifytoken, getlibrary)
router.delete("/library/:book", verifytoken, removefromlibrary)

router.post("/request/:book", verifytoken, sendrequest)
router.get("/request/book/:book", verifytoken, getrequest)
router.get("/request/author", verifytoken, getauthorrequests)
// router.get("/request/author/:id", verifytoken, getauthorrequests)
router.get("/request/user", verifytoken, getuserrequests)
router.put("/request/accept/:id", verifytoken, acceptrequest)
router.put("/request/reject/:id", verifytoken, rejectrequest)
router.delete("/request/withdraw/:id", verifytoken, withdrawrequest)


module.exports = router