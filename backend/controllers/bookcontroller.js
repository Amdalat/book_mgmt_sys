const Book = require("../models/bookmodel")
// const Auth = require("../models/authmodel")

const createbook = async (req, res) => {
    console.log(req.user.id)
    const {title, description} = req.body    
    
    if (!title || !description) {
        return res.status(401).json("Fill in the details") 
    }

    // if(!req.file){
    //     return res.status(401).json("File missing") 
    // }

    if(!req.files["bookfile"]){
        return res.status(401).json("File missing") 
    }

    const bookfile = req.files["bookfile"]?.[0].filename
    const bookcover = req.files["bookcover"]?.[0].filename

    try {
        const book = new Book({
            title,
            description,
            author: req.user.id,
            bookfile,
            bookcover
        })
        await book.save()
        
        return res.status(201).json("Book created successfully")
    } catch (err) {
        return res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const getbook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("author")
        res.status(200).json(book)
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const getbooksbyauthor = async (req, res) => {
    try {
        const books = await Book.find({author: req.params.author})
        res.status(200).json(books)
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const getbooksuploaded = async (req, res) => {
    try {
        const books = await Book.find({author: req.user.id})
        res.status(200).json(books)
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

// const getbooksuploaded = async (req, res) => {
//     console.log("Controller reached");
//     console.log("User:", req.user);

//     try {
//         const books = await Book.find({ author: req.user.id });
//         return res.status(200).json(books);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: "Error fetching uploaded books"
//         });
//     }
// };

const getbooksbyname = async (req, res) => {
    try {
        console.log(req.query)
        const { search, sort } = req.query;

        let query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        let sortOption = {};

        if (sort === "newest") {
            sortOption = { createdAt: -1 };
        }

        if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        }

        const books = await Book.find(query).sort(sortOption);

        res.status(200).json({BookCount: books.length, books});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getbooks = async (req, res) => {
    try {
        const books = await Book.find().populate("author")
        res.status(200).json(books)
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const updatebook = async(req, res) => {
    const bookexist = await Book.findById(req.params.id)

    if(!bookexist){
        return res.status(401).json("Doesn't exist") 
    }

    if(req.user.id != bookexist.author){
        return res.status(401).json("Not your book") 
    }

    const updateData = {
        ...req.body
    };

    if (req.file) {
        updateData.bookfile = req.file.path;
    }
 

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, updateData, {new:true})
        await book.save()
        return res.status(200).json("Book has been updated")
    } catch (err) {
        return res.status(401).json({message:"Error occurred while updating", err: err.message})
    }
}

const deletebook = async (req, res) => {
    const bookexist = await Book.findById(req.params.id)

    if(!bookexist){
        return res.status(401).json("Doesn't exist") 
    }

    if(req.user.id != bookexist.author){
        return res.status(401).json("Not your book") 
    }

    try {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json("Book has been deleted")
    } catch (err) {
        res.status(401).json({message:"Error occurred while updating", err: err.message})
    }
}

module.exports = { createbook, getbook, getbooks, getbooksbyname, getbooksbyauthor, getbooksuploaded, updatebook, deletebook }