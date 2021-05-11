//jshint esversion: 8
import {API} from "../../backend";

export const signup = user => {
    return fetch(`${API}auth/signup`,{
        mode: 'cors',
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}


export const signin = user => {
    return fetch(`${API}auth/login`,{
        mode: 'cors',
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
        return err;
    })
}



export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}

export const signout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();
    
        return fetch(`${API}auth/signout`,{
            method: "GET"
        })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err));
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}

export const changePasswordHandler = data => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}user/changePassword`,{
        mode: 'cors',
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
        return err;
    })
} 

export const forgotPasswordHandler = (data) => {
    return fetch(`${API}auth/forgotpassword`,{
        mode: 'cors',
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
        return err;
    })
}