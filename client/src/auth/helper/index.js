//jshint esversion: 8
import { API } from "../../backend";
import axios from "axios";
export const signup = (user) => {
    return fetch(`${API}auth/signup`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

export const signin = (user) => {
    return fetch(`${API}auth/login`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}auth/signout`, {
            method: "GET",
        })
            .then((response) => console.log("signout success"))
            .catch((err) => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

export const changePasswordHandler = (data) => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}user/changePassword`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

export const forgotPasswordHandler = (data) => {
    return fetch(`${API}auth/forgotpassword`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

export const resetPasswordHandler = (data) => {
    return fetch(`${API}auth/resetPassword/${data.email}`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return err;
        });
};

export const getUserData = async (setUserData) => {
    const { user, token } = isAuthenticated();
    await fetch(`${API}user/getUser`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })
        .then((response) => {
            if (response.ok) return response.json();
            else throw new Error("Not able to get user data");
        })
        .then((data) => {
            setUserData(data.userData);
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getEventData = (eventId, setEvents) => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}getEvent/${eventId}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Not able to fetch events Data");
            }
        })
        .then((data) => {
            setEvents((event) => {
                return [...event, data];
            });
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const registerEvent = (eventId, userData) => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}user/register/${eventId}`, {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(userData),
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            return error;
        });
};

export const updateProfile = (data) => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}user/updateProfile`, {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .then((error) => {
            return error;
        });
};

export const getRegisteredEvents = async (setEvents) => {
    const { user, token } = isAuthenticated();
    const output = [];
    const users = [];
    await fetch(`${API}user/getUser`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.userData.registered.forEach((event) => {
                const eachEvent = {
                    eventName: "",
                    paidStatus: "",
                };
                fetch(`${API}user/checkUser/event/${event.event}`, {
                    mode: "cors",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `${token}`,
                    },
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        eachEvent.eventName = data.name;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                fetch(`${API}user/checkUser/team/${event.teams}`, {
                    mode: "cors",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `${token}`,
                    },
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        eachEvent.paidStatus = data.paid;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                output.push(eachEvent);
            });
            return;
        });
};

// export const isRegisteredInEvent = (eventId, setStatus) => {
//     const {user, token} = isAuthenticated();
//     fetch(`${API}user/registerdinevent/${eventId}`, {
//         mode: "cors",
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`
//         }
//     })
//     .then(response => {
//         if(response.ok){
//             return response.json();
//         } else {
//             throw new Error("Did Not able to Get the Status of User");
//         }
//     })
//     .then(data => {
//         setStatus(data.status);
//         return;
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

export const getEventHandler = async (data) => {
    const { user, token } = isAuthenticated();
    await axios
        .get(`${API}event/getEvent/${data}`, {
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            return error;
        });
};
