//jshint esversion: 8
import React, { useState } from 'react';
import {contactus} from '../helper/contact'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const  ContactUsForm = () => {
    const [values, setValues] = useState({
        contactEmail: "",
        contactUserName: "",
        contactContent: "",
        contactSubject: "",
        error: "",
        success: false,
      });
      const { contactEmail, contactUserName, contactContent, contactSubject, error, success} = values;
      const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
      const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        contactus({contactEmail, contactUserName, contactContent, contactSubject}).then((data) =>{
            if(data.error){
              errorMessage()
                setValues({ ...values, error: data.error, success: false });
            }else{
              successMessage()
                setValues({
                    ...values,
                    contactSubject: "",
                    contactEmail: "",
                    contactContent: "",
                    contactUserName: "",
                    error: "",
                    success: true
                })
            }
        })
        .catch( () =>{
          errorMessage()
          console.log("Contact Us failed")
        }
          );
    };

    const successMessage = () => {
      toast.success('Message Sent', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      };
      const errorMessage = () => {
        
       if(error){
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
       }
        
      };
      const contactusform = () => {
          return(
          <span>
          <form action="" method="post">
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
          <div className="name py-3">
              <label className="fs-6 py-2" for="name">Name</label>
              <input className="form-control p-3 border-0 " type="text" name="name" id="name" placeholder="Enter Your Name" autocomplete="off" required
              onChange={handleChange("contactUserName")}
              value={contactUserName}/>
          </div>
          <div className="email py-3">
              <label className="fs-6 py-2" for="email">Email</label>
              <input className="form-control p-3 border-0 " type="email" name="email" id="email" placeholder="Enter Your Email" required
              onChange={handleChange("contactEmail")}
              value={contactEmail}/>
          </div>
          <div className="subject py-3">
              <label className="fs-6 py-2" for="subject">Subject</label>
              <input className="form-control p-3 border-0 " type="text" name="subject" id="subject" placeholder="Subject" required
              onChange={handleChange("contactSubject")}
              value={contactSubject}/>
          </div>
          <div className="message py-3">
              <label className="fs-6 py-2" for="messgae">Your Message</label>
              <textarea className="form-control p-3 border-0 " name="message" id="message" cols="30" rows="5" placeholder="Your Message"
              onChange={handleChange("contactContent")}
              value={contactContent}></textarea>
          </div>
          <button onClick={onSubmit} className="btn btn-success py-3 my-5 fs-7 ls-1 fw-bold border-0 bg-secondary btn-block">
              Submit
            </button>
      </form>
      </span>)
      }
    return (
        <span>
        {contactusform()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        </span>
    ); 
}

export default ContactUsForm;