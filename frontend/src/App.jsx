import { Routes, Route } from "react-router";


import Books from "./pages/books"
import {BookForm, SigninForm} from "./components/form"
import BookInfo from "./pages/book"
import Navbar from "./components/navbar"
import Requests from "./pages/requests";


function App() {
  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path="/signin" element={<SigninForm />} />

        <Route path="/upload" element={<BookForm />} />

        <Route path="/" element={<Books />} />

        <Route path="/requested" element={<Requests />} />
        
        <Route path="/requests" element={<Requests page="author" />} />

        <Route
            path="/uploads" element={<Books page="uploads" />}
            // path="/upload/:author" element={<Books page="upload" />}
        />

        <Route
            path="/library" element={<Books page="library" />}
        />

        <Route
            path="/book/:id" element={<BookInfo />}
        />

        
        {/* <Route
            path="/experience/:slug"
            element={<Experience />}
        /> */}
      </Routes>




    </>
  )
}

export default App
