import {API} from "../../backend"

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
    return fetch(`${API}/auth/signin`,{
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
    .catch(err => console.log(err))
}



export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const signout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next()

        return fetch(`${API}/auth/signout`,{
            method: "GET"
        })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
    return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}