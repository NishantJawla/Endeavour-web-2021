//jshint esversion: 8
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Navbar from "./core/components/Navbar";
import Footer from "./core/components/Footer"; 
import NotFoundPage from "./core/components/NotFoundPage";


const Routes = () => {
  return (
    <React.Fragment>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/signin" exact component={Signin} />
          <Route path="/:random" component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
};

export default Routes;
