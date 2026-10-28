// import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router"
import { UserContext } from "../assets/userContext";

function Navbar() {
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)
    // const [user, setUser] = useState(null)

    // useEffect(() => {
    //     fetch("/api/users/user", {
    //         credentials: "include"
    //     })
    //         .then(res => {
    //             if (!res.ok) {
    //                 setUser(null);
    //                 return null;
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             if (data !== null) {
    //                 setUser(data);
    //             }
    //         });
    // }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();

            if (response.ok) {
                setUser(null);
                console.log("Logged Out", data);
                alert("Logged Out");
                navigate("/")
            } else {
                console.log("Log Out failed", data);
                alert("Log Out failed");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary px-3 px-md-5">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">BookAmd</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to={`/`}><button class="nav-link" aria-current="page">Home</button></Link>
                        </li>
                        <li class="nav-item">
                            <Link to={`/library`}><button class="nav-link" aria-current="page">Library</button></Link>
                        </li>
                        <li class="nav-item">
                            <Link to={`/uploads`}><button class="nav-link" aria-current="page">Uploads</button></Link>
                        </li>

                        {/* not working immediately */}
                        {user? 
                        <>
                            <li class="nav-item">
                                <Link to={`/requested`}><button class="nav-link" aria-current="page">Requested</button></Link>
                            </li>
                            <li class="nav-item">
                                <Link to={`/requests`}><button class="nav-link" aria-current="page">Requests</button></Link>
                            </li>
                            <li class="nav-item">
                                {/* <button class="nav-link" aria-current="page" onClick={()=>{setUser(null)}}>Logout</button> */}
                                <button class="nav-link" aria-current="page" onClick={handleLogout}>Logout</button>
                            </li>
                        </>  : 
                        <li class="nav-item">
                            <Link to={`/signin`}><button class="nav-link" aria-current="page">Login</button></Link>
                        </li>
                        }
                    </ul>

                    {/* not working immediately */}
                    {user?.username && (
                        <>
                            <h4>Welcome back, {user.username.toUpperCase()}</h4>
                        </>
                    )}
                    
                    {/* <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    )

}

export default Navbar