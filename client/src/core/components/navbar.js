import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/img/logo.png"
import "../../styles.css"
const Navbar = () => {
    return (
        <div>
            <nav>
    <div className="nav-wrapper">
      <a href="#!" className="brand-logo"><img src={logo} alt="" width="40" height="40" class="d-inline-block align-text-top mx-5"/></a>
      <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      <ul className="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li className="waves-effect waves-light btn my-3 mx-2"><Link to="/">Login</Link></li>
      </ul>
    </div>
  </nav>

  <ul className="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">Javascript</a></li>
    <li><a href="mobile.html">Mobile</a></li>
  </ul>
        </div>
    )
}

export default Navbar
