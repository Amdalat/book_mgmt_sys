const Book = require("../models/bookmodel")
// const Library = require("../models/librarymodel")
const Request = require("../models/requestmodel")

const sendrequest = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json("User not logged in");
    }

    const book = await Book.findById(req.params.book)

    if (!book){
        return res.status(401).json("Book not found")
    }

    try {
        const existing = await Request.findOne({
            user: req.user.id,
            book: req.params.book
        });

        if (existing) {
            return res.status(409).json({message: "Book already requested"});
        }

        const author = book.author
    
        const request = new Request({
            user: req.user.id,
            book: req.params.book,
            author
        })
    
        const newrequest = await request.save();
    
        return res.status(200).json("Request Sent")
    } catch (err) {
        return res.status(400).json({message:"Error sending request", err: err.mess})
    }

}

const getrequest = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json("User not logged in");
    }

    const book = await Book.findById(req.params.book)

    if (!book){
        return res.status(401).json("Book not found")
    }

    try {
        const existing = await Request.findOne({
            user: req.user.id,
            book: req.params.book
        });

        if (!existing) {
            return res.status(409).json({message: "Book hasnt been requested"});
        }
    
        return res.status(201).json(existing)
    } catch (err) {
        return res.status(400).json({message:"Error sending request", err: err.mess})
    }

}


const getauthorrequests = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json("User not logged in");
    }

    try {
        const requests = await Request.find({author: req.user.id}).populate("user").populate("book");

        if (!requests) {
            return res.status(409).json({message: "No Requests"});
        }
    
        console.log(requests)
        return res.status(201).json(requests)
    } catch (err) {
        return res.status(400).json({message:"Error retrieving requests", err: err.mess})
    }

}

const getuserrequests = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json("User not logged in");
    }

    try {
        const requests = await Request.find({user: req.user.id}).populate("author").populate("book");

        if (!requests) {
            return res.status(409).json({message: "No Requests"});
        }
    
        console.log(requests)
        return res.status(201).json(requests)
    } catch (err) {
        return res.status(400).json({message:"Error retrieving requests", err: err.mess})
    }

}

const acceptrequest = async (req, res) => {
    //put statement for if user is the same as author, ame for reject
    if (!req.user?.id) {
        return res.status(401).json("User not logged in");
    }

    try {
        const request = await Request.findByIdAndUpdate(req.params.id, {status: "accepted"}, {new:true, runValidators: true });
        
        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        console.log(request)
        return res.status(201).json(request)
    } catch (err) {
        return res.status(400).json({message:"Error accepting request", err: err.mess})
    }

}

const rejectrequest = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json("User not logged in");
    }

    try {
        const request = await Request.findByIdAndUpdate(req.params.id, {status: "rejected"}, {new:true, runValidators: true });
        
        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        console.log(request)
        return res.status(201).json(request)
    } catch (err) {
        return res.status(400).json({message:"Error reject request", err: err.mess})
    }

}
// do one that needs user id and book id
const withdrawrequest = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json("User not logged in");
    }

    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        
        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        console.log(request)
        return res.status(201).json({message:"Request deleted", err: err.mess})
    } catch (err) {
        return res.status(400).json({message:"Error deleting request", err: err.mess})
    }

}

module.exports = { sendrequest, getrequest, getauthorrequests, getuserrequests, acceptrequest, rejectrequest, withdrawrequest }