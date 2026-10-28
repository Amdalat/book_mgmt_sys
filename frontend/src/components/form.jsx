import { useState, useContext } from "react";
import { useNavigate } from "react-router";
// import { Link } from "react-router"
// import { useContext } from "react";
import { UserContext } from "../assets/userContext";

function SigninForm() {
    const [signin, setSignin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setUser} = useContext(UserContext)
    

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Signup successful", data);
            setUsername("")
            setEmail("")
            setPassword("")
            alert("Signup successful");
            // setUser(data);
            navigate("/")
        } else {
            console.log("Signup failed", data);
            alert("Signup failed");
        }
    };

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            const userResponse = await fetch("/api/users/user", {
                credentials: "include"
            });

            if (!userResponse.ok) {
                alert("Login successful, but couldn't load user information");
                return;
            }

            const userData = await userResponse.json();

            setUser(userData);

            setEmail("");
            setPassword("");

            navigate("/");

        } catch (error) {
            console.error("Login failed:", error);
            alert("Something went wrong");
        }
    };

    return(
        <div className="middle" style={{ alignItems:"flex-start", maxHeight:"340px" }}>
            {/* <div class="card w-100 w-ld-75"> */}
            <div class="card formcss" >
                <form class="card-body">
                    {signin ? <h3 style={{ color:"grey" }}>SIGNIN</h3> : <h3 style={{ color:"grey" }}>SIGNUP</h3> }
                    
                    <hr style={{ width:"60px", marginTop:"-3px" }}/>

                    {!signin ? 
                        <>
                            <div class="mb-3">
                                <label for="username" class="form-label">Name</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  class="form-control" id="exampleFormControlInput1"/>
                            </div>
                        </> : null }
                    
                    <div class="mb-3">
                        <label for="password" class="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  class="form-control" id="exampleFormControlInput1"/>
                    </div>

                    {signin ? <button class="btn btn-primary" onClick={handleSignin}>Sign In</button> : <button class="btn btn-primary" onClick={handleSignup}>Login</button> }
                    <br />
                    
                    {signin ? <a onClick={ ()=>{setSignin(false)}}>Signup?</a> : <a onClick={ ()=>{setSignin(true)}}>Signin?</a> }
                </form>
            </div>
        </div>
    )

}

function BookForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [bookfile, setBookfile] = useState(null);
    const [bookcover, setBookcover] = useState(null);

    const navigate = useNavigate()

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("bookfile", bookfile);
        formData.append("bookcover", bookcover);

        const response = await fetch("/api/books/", {
            method: "POST",
            credentials: "include",
            body: formData
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            console.log("Book Upload successful", data);
            setTitle("")
            setDescription("")
            setBookfile(null)
            setBookcover(null)
            alert("Book Upload successful");
            navigate("/")
        } else {
            console.log("Book Upload failed", data);
            alert("Book Upload failed");
        }
    };

    return(
        <div className="middle" style={{ alignItems:"flex-start" }}>
            <div class="card formcss">
        {/* <div className="middle">
            <div class="card" style={{ width:"50%", maxwidth: "500px", padding:"1rem 2rem" }}> */}
                <form class="card-body">
                    <h3 style={{ color:"grey" }}>Upload Book</h3>
                    
                    <hr style={{ width:"60px", marginTop:"-3px" }}/>

                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  class="form-control" id="exampleFormControlInput1"/>
                    </div>
                    
                    <div class="mb-3">
                        <label for="password" class="form-label">Description</label>
                        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} class="form-control" id="exampleFormControlInput1" ></textarea>
                        {/* <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}  class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/> */}
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Book Cover</label>
                        <input type="file" name="bookcover" accept="image/*" onChange={e => setBookcover(e.target.files[0])} class="form-control" id="exampleFormControlInput1" />
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Book</label>
                        <input type="file" name="bookfile" accept=".pdf,.doc,.docx" onChange={e => setBookfile(e.target.files[0])} class="form-control" id="exampleFormControlInput1"/>
                    </div>

                    <button class="btn btn-primary" onClick={handleUpload}>Upload</button>
                    <br />
                </form>
            </div>
        </div>
    )

}

export {SigninForm, BookForm}