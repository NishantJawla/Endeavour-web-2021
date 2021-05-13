//jshint esversion: 8
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPasswordHandler} from "../auth/helper";
import  "./css/signup.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {
  const [values, setValues] = useState({
    email:"",
    passCode: "",
    plainPassword: "",
    error: "",
    msg: "",
    success: false,
  });

  const { email,passCode,plainPassword, error, success, msg } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if(values.email.toString() === ""){
      errorMessage2("Email Field is required")
      return;
    }
    if(values.passCode.toString() === ""){
      errorMessage2("Pass Code Field is required")
      return;
    }
    if(values.plainPassword.toString() === ""){
      errorMessage2("Pass Code Field is required")
      return;
    }
    setValues({ ...values, error: false });
    resetPasswordHandler({ email,passCode,plainPassword })
    .then((data) => {
      console(data)
        if (data.error) {
        errorMessage()
        setValues({ ...values, error: data.error, success: false });
        } else {
        successMessage("Succefully changed password")
        setValues({
        email:"",
        passCode: "",
        plainPassword: "",
        error: "",
        success: true,
        });
        }
    })
    .catch( () =>{
        console.log("Error in changePasscord")
    }
        );

};

const resetPasswordForm = () => {
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
            <label className="fs-6 ls-1">Email</label>
            <input
                className="form-control"
                onChange={handleChange("email")}
                type="text"
                value={email}
            />
            </div>
            <div className="form-group py-2">
            <label className="fs-6 ls-1">4-digit Code</label>
            <input
                className="form-control"
                onChange={handleChange("passCode")}
                type="text"
                value={passCode}
            />
            </div>
            <div className="form-group py-2">
            <label className="fs-6 ls-1">New Password</label>
            <input
                className="form-control"
                onChange={handleChange("plainPassword")}
                type="password"
                value={plainPassword}
            />
            </div>
            For security purposes popper is diabled on this page.
            If you have entered wrong password then use forgot password again!
            <button onClick={onSubmit} className="btn btn-success py-3 my-5 fs-7 ls-1 fw-bold border-0 bg-secondary btn-block">
            Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = (data) => {
    
            toast.success(data, {
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
const errorMessage2 = (data) => {
 
    toast.error(data, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  
};
return (
    <div>
    {/* <Base title="Sign up page" description="A page for user to sign up!"> */}
        <div class="signup py-5">
            <div className="container pt-5">
                <div className="bg-transparent text-white text-center p-5">
                <div className="heading-font text-center color-white fw-bold">Reset Password</div>
                    {resetPasswordForm()}
                    <p className="text-white text-center">{JSON.stringify(values)}</p>
                </div>
            </div>
        </div>
    
    
    </div>
);
};

export default ResetPassword;
