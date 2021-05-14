//jshint esversion: 8
import React, { useState } from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import  "./css/signup.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber:"",
    plainPassword: "",
    error: "",
    success: false,
  });

  const { name, email,phoneNumber, plainPassword, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name,phoneNumber, email, plainPassword })
      .then((data) => {
        if (data.error) {
          errorMessage()
          setValues({ ...values, error: data.error, success: false });
        } else {
          successMessage()
          setValues({
            ...values,
            name: "",
            email: "",
            phoneNumber: "",
            plainPassword: "",
            error: "",
            success: true,
          });
        }
      })
      .catch( () =>{
        errorMessage()
        console.log("Error in signup")
      }
        );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-10 offset-md-4 offset-sm-1 text-left">
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
          <form action="">
            <div className="form-group py-2">
              <label className="fs-6 ls-1">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group py-2">
              <label className="fs-6 ls-1">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group py-2">
              <label className="fs-6 ls-1">Phone Number</label>
              <input
                className="form-control"
                onChange={handleChange("phoneNumber")}
                type="tel"
                value={phoneNumber}
              />
            </div>
            <div className="form-group py-2">
              <label className="fs-6 ls-1">Password</label>
              <input
                className="form-control"
                onChange={handleChange("plainPassword")}
                type="password"
                value={plainPassword}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success py-3 my-5 fs-7 ls-1 fw-bold border-0 bg-secondary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    
            toast.success('New account was created successfully. Verify your email by clicking on the link sent to your mail. Please Login to Continue', {
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

  return (
      <div>
    {/* <Base title="Sign up page" description="A page for user to sign up!"> */}
        <div class="signup py-5">
            <div className="container pt-5">
                <div className="bg-transparent text-white text-center p-5">
                  <div class="heading-font text-center pb-4 fw-bold color-white ls-2">SignUp</div>
                    {signUpForm()}
                    <p className="text-white text-center">{JSON.stringify(values)}</p>
                </div>
            </div>
        </div>
      
      
   
    </div>
  );
};

export default Signup;
