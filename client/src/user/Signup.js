//jshint esversion: 8
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import  "./css/signup.css"
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
          setValues({ ...values, error: data.error, success: false });
        } else {
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
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-10 offset-md-4 offset-sm-1 text-left">
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
    return (
      <div className="row bg-transparent">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row bg-transparent">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
      <div>
    {/* <Base title="Sign up page" description="A page for user to sign up!"> */}
        <div class="signup py-5">
            <div className="container pt-5">
                <div className="bg-transparent text-white text-center p-5">
                  <div class="heading-font text-center pb-4 fw-bold color-white ls-2">SignUp</div>
                    {successMessage()}
                    {errorMessage()}
                    {signUpForm()}
                    <p className="text-white text-center">{JSON.stringify(values)}</p>
                </div>
            </div>
        </div>
      
      
   
    </div>
  );
};

export default Signup;
