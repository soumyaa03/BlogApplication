import logo from "../imgs/logo.png";
 import React from 'react';
 import { Link } from "react-router-dom"
const  Navbar = () => {
    return (
        <nav className="navbar">
            <Link></Link>
            <img src={logo} className="w-full"/>
            
        </nav>
    )
}

export default Navbar;