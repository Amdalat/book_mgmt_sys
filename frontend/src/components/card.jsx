import { Link } from "react-router"

function Card({index, book, imgshow=false}){
    return(
        <div class="card" key={index} style={{ backgroundColor:"white", flex:"0 0 250px", }}>
            {imgshow ? <img src="" class="card-img-top" alt="..."/> : <div style={{ backgroundColor:"grey", width:"100%", height:"200px"  }}></div>}

            <div class="card-body">
                <h5 class="card-title">{book.name}</h5>
                <p class="card-text">{book.description}</p>
                <Link to={`/book/${book._id}`}><button class="btn btn-primary">Details</button></Link>
            </div>
        </div>                    
    )

}

function RequestedCard({index, request}){
    const handleWithdraw = async () => {
        const response = await fetch(
            `/api/books/request/withdraw/${request._id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        const data = await response.json();
        console.log(data);
    };

    return(
        <div class="requestcard" key={index}>
            <p><b>{request?.author.username.toUpperCase()}</b></p>
            <p><b>{request?.book.title.toUpperCase()}</b></p>

            <div class="gap2">
                <button class="btn btn-primary" onClick={handleWithdraw}> WITHDRAW</button>
            </div>
        </div>                    
    )

}

function RequestCard({index, request}){
    const handleAccept = async () => {
        const response = await fetch(
            `/api/books/request/accept/${request._id}`,
            {
                method: "PUT",
                credentials: "include"
            }
        );

        const data = await response.json();
        console.log(data);
    };

    const handleReject = async () => {
        const response = await fetch(
            `/api/books/request/reject/${request._id}`,
            {
                method: "PUT",
                credentials: "include"
            }
        );

        const data = await response.json();
        console.log(data);
    };
    return(
        <div class="requestcard" key={index}>
            <p><b>{request?.user.username.toUpperCase()}</b></p>
            <p><b>{request?.book.title.toUpperCase()}</b></p>

            <div class="gap2">
                {request?.status == "accepted" ? <button class="btn btn-secondary">ACCEPTED</button> : <button class="btn btn-primary" onClick={handleAccept}>ACCEPT</button>}

                {request?.status == "rejected" ? <button class="btn btn-secondary">REJECTED</button> : <button class="btn btn-primary" onClick={handleReject}>REJECT</button>}
            </div>
        </div>                    
    )

}

export {Card, RequestedCard, RequestCard}