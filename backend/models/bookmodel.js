const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookfile: {type:String},
    bookcover: {type:String},
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema)
module.exports = Book