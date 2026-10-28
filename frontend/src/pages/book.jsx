import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { UserContext } from "../assets/userContext";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
// import { faFile } from '@fortawesome/free-solid-svg-icons';

function BookInfo() {
    const { id } = useParams();
    const [readBook, setReadBook] = useState(false);
    const [book, setBook] = useState(null)
    const [request, setRequest] = useState(null)
    const {user} = useContext(UserContext)
    const [inLibrary, setInLibrary] = useState(null)


    useEffect(() => {
        fetch(`/api/books/book/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setBook(data);
            })
            .catch((error) => {
                console.log("ERROR:", error);
            });
    }, [id]);

    useEffect(() => {
        fetch(`/api/books/library/${id}`,{
            credentials: "include"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.message? setInLibrary(false): setInLibrary(true);
            })
            .catch((error) => {
                console.log("ERROR:", error);
            });
    }, [id]);

    
    useEffect(() => {
        fetch(`/api/books/request/book/${id}`, {
            credentials: "include"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setRequest(data);
            })
            .catch((error) => {
                console.log("ERROR:", error);
            });
    }, [id]);

    const addtolibrary = async () => {
        const response = await fetch(`/api/books/book/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                book:id
            })
        });

        if (!user) alert("User not logged in!")

        const data = await response.json();

        if (response.ok) {
            console.log("Added to Library", data);
            setInLibrary(true);
            alert("Added to Library");
        } else {
            console.log("Already in Library", data);
            alert(`${data.message}`);
        }
    };

    const removefromlibrary = async () => {
        const response = await fetch(`/api/books/library/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Removed from Library", data);
            setInLibrary(false);
            alert("Removed from Library");
        } else {
            console.log("Couldn't be removed", data);
            alert(`${data}`);
        }
    };

    const requestbook = async () => {
        const response = await fetch(`/api/books/request/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                book:id
            })
        });

        const data = await response.json();

        if (!user) alert("User not logged in!")

        if (response.ok) {
            console.log("Request sent", data);
            // setInLibrary(true);
            alert("Request sent");
        } else {
            console.log("Already requested", data);
            alert(`Already requested ${data}`);
        }
    };

    // in progress
    // const unrequestbook = async () => {
    //     const response = await fetch(
    //         `/api/books/request/withdraw/${request._id}`,
    //         {
    //             method: "DELETE",
    //             credentials: "include"
    //         }
    //     );

    //     const data = await response.json();
    //     console.log(data);
    // };
    
    return(
        <div className="py2px5">
            {book ?(
                <div>
                    {console.log(book)}

                    {readBook ? (
                        <div>
                            <button class="btn btn-danger" onClick={() => setReadBook(false)}>Back</button>
                            <iframe
                                src={`/uploads/books/${book.bookfile}`}
                                width="100%"
                                height="700px"
                                title={book.title}
                            />
                        </div>   
                    ):(
                        <div className="row">
                            <div className="col-3">
                                {/* <FontAwesomeIcon icon={faFile}/> */}
                                
                                {book.bookcover ? <img src={`/uploads/books/${book.bookcover}`} class="card-img-top" alt={`${book.title}`} height={"450px"}/> : <div style={{ backgroundColor:"grey", width:"100%", height:"450px"  }}></div>}
                            </div>

                            <div className="col-9 py-4">
                                <h2>{book.title.toUpperCase()}</h2> <br/>
                                <h3>{book.author.username}</h3> <br/>
                                <h5>{book.description}</h5> <br/>

                                <div className="rowflex">
                                    {/* put condition to change to requested btn */}
                                    {console.log(request)}
                                    {user?._id === book.author?._id || request?.status === "accepted" ? (
                                        <button class="btn btn-success" onClick={() => setReadBook(true)}>Read</button>
                                    ) : request?._id  ? (
                                        <button className="btn btn-secondary">Requested</button>
                                        // <button className="btn btn-secondary" onClick={unrequestbook}>Requested</button>
                                    ) : (
                                        <button className="btn btn-success" onClick={requestbook}>Request</button>
                                    )}

                                    {inLibrary? <button class="btn btn-danger" onClick={removefromlibrary}>Remove from Library</button> : <button class="btn btn-danger" onClick={addtolibrary}>Add to Library</button>}
                                    
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ):(
                <h4>Loading...</h4>
            )}
        </div>
    )

}

export default BookInfo