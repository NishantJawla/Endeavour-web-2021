//jshint esversion: 8
import { API } from "./../../backend";
import { isAuthenticated } from "./../../auth/helper/index";

export const registrationsPerEvent = (setUsersPerEvent) => {
    const { user,  token} = isAuthenticated();
    return fetch(`${API}`)
}