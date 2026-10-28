const Library = require("../models/librarymodel")

const addtolibrary = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json("User not logged in");
    }

    try {
        const existing = await Library.findOne({
            user: req.user.id,
            book: req.params.id
        });

        if (existing) {
            return res.status(409).json("Book already in library");
        }

        const book = new Library({
            user: req.user.id,
            book: req.params.id
        })

        const savedbook = await book.save();

        return res.status(201).json("Book added to Library")
    } catch (err) {
        return res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const getlibrarybook = async (req, res) => {
    try {
        const book = await Library.findOne({ 
            user: req.user.id,
            book: req.params.book 
        }).populate("book")

        if(!book){
            res.status(401).json({message:"Book not in library"})
        }

        res.status(200).json(book.book)
        // res.status(200).json(book.book)
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const getlibrary = async (req, res) => {
    try {
        const library = await Library.find({user : req.user.id }).populate("book")
        const books = library.map(item => item.book);

        res.status(200).json(books)
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const removefromlibrary = async (req, res) => {
    try {
        const library = await Library.findOneAndDelete({
            user: req.user.id,
            book: req.params.book
        });

        if (!library) {
            return res.status(404).json({
                message: "Book not found in your library"
            });
        }

        res.status(200).json({
            message: "Book removed from your library"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error removing book from library",
            err: err.message
        });
    }
};


module.exports = { addtolibrary, getlibrarybook, getlibrary, removefromlibrary }