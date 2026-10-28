const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    status: {
        type: String,
        enum: ["accepted", "queued", "rejected"],
        default: "queued"
    }
}, { timestamps: true });

const Request = mongoose.model("Request", requestSchema)
module.exports = Request