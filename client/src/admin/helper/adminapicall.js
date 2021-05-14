//jshint esversion: 8
import { API } from "./../../backend";
import { isAuthenticated } from "./../../auth/helper/index";

export const registrationsPerEvent = (setUsersPerEvent) => {
    const { user,  token} = isAuthenticated();
    // this will return registrarion in each event 
    /* 
        output format is an obeject
        {
            eventName: 'name of the event',
            teamCount: "count"
        }  
    */
    return fetch(`${API}admin/api/registrationPerEvent`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setUsersPerEvent(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUsersCount = (setData) => {
    const { user, token } = isAuthenticated();
    // this will return the total no of teams 
    /* 
        output format is an obeject
        {
            teamCount: "count"
        }  
    */
    return fetch(`${API}admin/api/getUser/count`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUsersByEvent = (eventId, paidStatus, setData) =>{
    const { user, token } = isAuthenticated();
    //get users according to event and paid status
    /* 
        output fomat is array of all the users object
        [user1, user2]
    */
    return fetch(`${API}admin/api/getUsers/eventId/${eventId}/${paidStatus}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getTeamHeads = (eventId, paidStatus, setData) =>{
    const { user, token } = isAuthenticated();
    //get team heads according to paid status and event
    /*
        output format is array of teamhead objects
    */
    return fetch(`${API}admin/api/teamHead/${eventId}/${paidStatus}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getTeamHeadsAll = (paidStatus, setData) =>{
    const { user, token } = isAuthenticated();
    return fetch(`${API}admin/api/teamHead/all/${paidStatus}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUserFromEndvrId = (endvrId, setData) =>{
    const { user, token } = isAuthenticated();
    return fetch(`${API}admin/api/getUser/endvId/${endvrId}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUserFromMobile = (mobile, setData) => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}admin/api/getUser/number/${mobile}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUsers = (paidStatus, setData) => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}admin/api/getUser/all/${paidStatus}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

// export const getUsersAll = (setData) => {
//     const { user, token } = isAuthenticated();
//     return fetch(`${API}admin/api/getUser/all/all`, {
//         mode: "cors",
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `${token}`
//         }
//     })
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         setData(data);
//         return;
//     })
//     .catch(error => {
//         console.log(error);
//     });
// };