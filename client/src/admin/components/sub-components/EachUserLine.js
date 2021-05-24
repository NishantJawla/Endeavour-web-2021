//jshint esversion: 8
import React from "react";

function EachUserLine (props) {

    const showDetails = () => {
        props.setShowSlowly(true);
        props.setUserData(props.user);
    }

    return (
        <tr className= {props.index%2 === 0 ? "bg-primary" : ""}>
            <th scope="row">{props.index}</th>
            <td>{props.user.endvrid}</td>
            <td>{props.user.name}</td>
            <td>{props.user.email}</td>
            <td>{props.user.semester}</td>
            <td>{props.user.college}</td>
            {
                props.user.profile ? 
                <td className="color-sucess">Completed</td> :
                <td className="color-white">Not Completed</td> 
            }
            {
                props.user.eventPass ? 
                <td className="color-sucess">Purchased</td> :
                <td className="color-white">Not Purchased</td> 
            }
            <td onClick={showDetails} className="text-decoration-underline cursor-pointer">Details</td>
        </tr>
    );
}

export default EachUserLine;    