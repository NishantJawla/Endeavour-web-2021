import {API} from '../../../backend'

export const contactus = data => {
    return fetch(`${API}user/contactUs`,{
        mode: 'cors',
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}