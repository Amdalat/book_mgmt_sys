import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { RequestCard, RequestedCard } from "../components/card";

function Requests({page}) {
    const [requests, setRequests] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (page == "author"){
            fetch("/api/books/request/author", {
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
                        setRequests(data);
                    }
                })
        } else  {
            fetch("/api/books/request/user", {
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
                        setRequests(data);
                    }
                })
        }
        
    }, [navigate, page]);

    return(
        <div className="middlecol py2">
            <div style={{ float:"left" }}>
                <>
                    {(page == "author") ? <h3>REQUESTS</h3> : <h3>REQUESTED</h3>}
                </>
                <hr style={{ width:"60px", marginTop:"-3px" }}/>
            </div>

            <div className="rowflex">
                {(requests.length !== 0) ? requests.map((request, index)=>{
                    return(
                        <>
                            {(page == "author") ? <RequestCard request={request} index= {index}/> : <RequestedCard request={request} index= {index}/>}
                        </>
                    )
                }) : <h3>No Books...</h3> }
                                
            </div>
        </div>
    )

}

export default Requests