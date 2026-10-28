import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

function Books({page}) {
    const { author } = useParams();

    const [books, setBooks] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (page === "uploads") {
            fetch("/api/books/upload", {
                credentials: "include"
            })
                .then(res => {
                    if (res.status === 401) {
                        alert("You're not logged in");
                        navigate("/", { replace: true });
                        return null;
                    }
                    return res.json();
                })
                .then(data => {
                    if (data !== null) {
                        setBooks(data);
                    }
                })
        } else if (page === "library") {
                        fetch("/api/books/library", {
                credentials: "include"
            })
                .then(res => {
                    if (res.status === 401) {
                        alert("You're not logged in");
                        navigate("/", { replace: true });
                        return null;
                    }
                    return res.json();
                })
                .then(data => {
                    if (data !== null) {
                        setBooks(data);
                    }
                })

        } else {
            fetch("/api/books/")
                .then(res => res.json())
                .then(data => setBooks(data));
        }
    }, [page, author, navigate]);

    return(
        <div className="middlecol py2">
            <div>
            {/* <div className="rowflex" style={{ justifyContent:"center" }}> */}
                {
                   ( page == "library")? <><h3>LIBRARY</h3><hr style={{ width:"60px", marginTop:"-3px" }}/></> :
                   ( page == "uploads")? <><h3>UPLOADS</h3><hr style={{ width:"60px", marginTop:"-3px" }}/></> : <><h3>BOOKS</h3><hr style={{ width:"60px", marginTop:"-3px" }}/></>
                }
                
                {page === "uploads"? <Link to={`/upload`}><button class="btn btn-primary">New Book +</button></Link>: null }
                
                
            </div>


            <div className="rowflex">
                {(books.length !== 0) ? books.map((book, index)=>{
                return(
                    <div class="card bookcard" key={index}>
                        {book.bookcover ? <img src={`/uploads/books/${book.bookcover}`} class="card-img-top bookcardimg" alt={`${book.title}`}/> : <div className="bookcardimg"></div>}
                        
                        {/* <div class="card-body"> */}
                        <div class="bookcardbody">
                            <h5>{book.title}</h5>
                            <h6>{book.author.username}</h6>
                            <p>{book.description}</p>
                            <Link to={`/book/${book._id}`}><button class="btnn">Details</button></Link>
                        </div>
                        {/* <div class="card-body">
                            <h5 class="card-title">{book.title}</h5>
                            <h6 class="card-text">{book.author.username}</h6>
                            <p class="card-text">{book.description}</p>
                            <Link to={`/book/${book._id}`}><button class="btn btn-primary btnn">Details</button></Link>
                        </div> */}
                    </div>                    
                )
            }) : <h3>No Books...</h3> }

            </div>
        </div>
    )

}

export default Books

// fetch(`/api/books/library`, {
//     credentials: "include"
// })
// .then(res => res.json())
// .then(data => setBooks(data));

// fetch(`/api/books/upload`, {
//     credentials: "include"
// })   
//     .then(async(res) =>  {
//         const data = await res.json();

//         if (data.message == "Access denied") {
//             navigate("/");
//             alert("You're not Logged in")
//         }
//     })
//     .then(data => setBooks(data));

//     fetch(`/api/books/upload`, {
//         credentials: "include"
//     })   
//         .then(async(res) =>  {
//             const data = await res.json();

//             if (data.message == "Access denied") {
//                 navigate("/", { replace: true });
//                 alert("You're not Logged in")
//               // return null;
//             }
//         })
//         .then(data => setBooks(data));