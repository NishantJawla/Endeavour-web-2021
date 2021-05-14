//jshint esversion: 8
import React,{useEffect} from "react";
import NotFoundImg from "./../../assets/img/notfound.png";

function NotFoundPage(){
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <React.Fragment>
            <div className="bg-secondary">
                <div className="container">
                    <div className="">
                        <img style={{marginLeft:"10%"}} width="80%" src={NotFoundImg} alt="not found img" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotFoundPage;