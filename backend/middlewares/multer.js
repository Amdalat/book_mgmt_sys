const path = require('path');
const multer = require('multer');

const pfpstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profiles')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const pfpupload = multer({ 
  storage: pfpstorage
});


const bcoverstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/bookcovers')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const bcoverupload = multer({ 
    storage: bcoverstorage
 });


const bookstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/books')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const bookupload = multer({
    storage: bookstorage
});
// const bookupload = multer({
//     storage: bookstorage,
//     fileFilter: (req, file, cb) => {
//         if (
//             file.mimetype === "application/pdf" ||
//             file.mimetype.startsWith("text/")
//         ) {
//             cb(null, true);
//         } else {
//             cb(new Error("Only readable files are allowed"), false);
//         }
//     }
// });

module.exports = {pfpupload, bookupload, bcoverupload}