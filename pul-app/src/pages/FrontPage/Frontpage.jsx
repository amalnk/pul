import React from "react";
import "./Frontpage.css"
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Maps from "../../components/maps/Maps";



export default function Frontpage(){
    return(
        <div className="fp-main">
            <Navbar/>
            <Hero/>
            
            <Maps/>
        </div>
    )
}