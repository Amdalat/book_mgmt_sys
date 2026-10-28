const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

const port = process.env.PORT || 5000;

const authrouter = require("./routes/authroutes");
app.use("/api/auth/", authrouter)

const userrouter = require("./routes/userroutes");
app.use("/api/users/", userrouter)

const bookrouter = require("./routes/bookroutes");
app.use("/api/books/", bookrouter)

// const libraryrouter = require("./routes/libraryroutes");
// app.use("/api/library/", libraryrouter)

app.use("/uploads", express.static("uploads"));
{/* <iframe
    src="http://localhost:5000/uploads/documents/cv.pdf"
/> */}


mongoose.connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("Connected to MongoDB")})
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/uploads", express.static("uploads"))

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) {
        return next();
    }

    res.sendFile(path.join(frontendPath, "index.html"));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/check", (req, res) => {
  res.send("Hello World!");
});