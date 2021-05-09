//jshint esversion: 8
import React, { useState } from 'react';
import { API } from './../../../backend';
import { Alert } from "react-bootstrap";

function ContactUsForm(){
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [response, setResponse] = useState({
        isError: false,
        msg: ""
    });

    function updateValues(event){
        const {name, value} = event.target;
        setFormValues(() => {
            if(name === "name"){
                return ({
                    ...formValues,
                    name: value
                });
            } else if(name === "email") {
                return ({
                    ...formValues,
                    email: value
                });
            } else if(name === "subject") {
                return ({
                    ...formValues,
                    subject: value
                });
            } else if(name === "message") {
                return ({
                    ...formValues,
                    message: value
                });
            }
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        console.log(formValues);
        const url = API+"user/contactUs";
        console.log(url);

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contactUserName: formValues.name,
                contactEmail: formValues.email,
                contactSubject: formValues.subject,
                contactContent: formValues.message
            })
        }).then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(data => {
            setResponse({
                isError: false,
                msg: "Form Submitted Successfully"
            });
            setFormValues({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        }).catch(error => {
            setResponse({
                isError: true,
                msg: error
            });
            console.log(error);
        });
    }

    const style = {
        display: response.msg ? "block" : "none"
    };

    return (
        <React.Fragment>
            <Alert style={style} variant={response.isError ? "warning" : "success"}>
                {response.msg}
            </Alert>
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="name py-3">
                    <label className="fs-6 py-2" htmlFor="name">Name</label>
                    <input onChange={updateValues} className="form-control p-3 border-0" value={formValues.name} type="text" name="name" id="name" placeholder="Enter Your Name" autoComplete="off" required/>
                </div>
                <div className="email py-3">
                    <label className="fs-6 py-2" htmlFor="email">Email</label>
                    <input onChange={updateValues} className="form-control p-3 border-0" value={formValues.email} type="email" name="email" id="email" placeholder="Enter Your Email" required/>
                </div>
                <div className="subject py-3">
                    <label className="fs-6 py-2" htmlFor="subject">Subject</label>
                    <input onChange={updateValues} className="form-control p-3 border-0" value={formValues.subject} type="text" name="subject" id="subject" placeholder="Subject" required/>
                </div>
                <div className="message py-3">
                    <label className="fs-6 py-2" htmlFor="messgae">Your Message</label>
                    <textarea onChange={updateValues} className="form-control p-3 border-0" value={formValues.message} name="message" id="message" cols="30" rows="5" placeholder="Your Message"></textarea>
                </div>
                <div className="submit-button py-3">
                    <button className="w-100 color-white py-2 rounded  fs-7 ls-1 fw-bold border-0 bg-primary hbg-dark">Submit</button>
                </div>
            </form>
        </React.Fragment>
    ); 
}

export default ContactUsForm;