import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"


export default function Navbar(){
    return(
        <div className="nav-main">
            <div className="nav-logo">
                <img src={logo} className="logo" />

            </div>
            <ul className="nav-links">
                <li><Link to=''>Home</Link></li>
                <li><Link to=''>About</Link></li>
                <li><Link to=''>Locate</Link></li>
                <li><Link to=''>Add Utility</Link></li>
                <li><Link to=''>Contact</Link></li>
            </ul>

            <div className="nav-btns">
                <Link to=''><button className="sign-btn">Sign Up</button></Link>
                <Link to=''><button className="login-btn">Login</button></Link>
            </div>
        </div>
    )
}