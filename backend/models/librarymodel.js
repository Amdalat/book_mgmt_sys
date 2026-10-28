const mongoose = require("mongoose")

const librarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },

    // status: {
    //     type: String,
    //     enum: ["unread", "reading", "completed"],
    //     default: "unread"
    // },

    // progress: {
    //     type: Number,
    //     default: 0
    // },

    // favorite: {
    //     type: Boolean,
    //     default: false
    // }
}, { timestamps: true });

const Library = mongoose.model("Library", librarySchema)
module.exports = Library