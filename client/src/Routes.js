//jshint esversion: 8
import React, {useState} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Navbar from "./core/components/Navbar";
import Footer from "./core/components/Footer"; 
import Team from "./core/components/Team";
import Sponsers from "./core/components/Sponsers";
import NotFoundPage from "./core/components/NotFoundPage";
import Loader from "./core/components/Loader";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import ChangePassword from "./user/ChangePassword";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import EventRegister from "./user/EventRegister";
import SpeakersPage from "./core/components/SpeakersPage";
const Routes = () => {

  const [hide, setHide] = useState(true);

    setTimeout(() => {
        setHide(false);
    }, 3500);

  return (
    <React.Fragment>
      <BrowserRouter>
      { hide ? <Loader /> : null }
      <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/signin" exact component={Signin} />
          <Route path="/team" exact component={Team} />
          <Route path="/sponsers" exact component={Sponsers} />
          <Route path="/forgotpassword" exact component={ForgotPassword} />
          <Route path="/resetpassword" exact component={ResetPassword} />
          <Route path="/guests" exact component={SpeakersPage} />
          <Route path="/events/:eventId" exact component={EventRegister} />   
          <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
          <PrivateRoute path="/changepassword" exact component={ChangePassword} />
          <Route path="/:random" component={NotFoundPage}/>
        </Switch>
      <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
