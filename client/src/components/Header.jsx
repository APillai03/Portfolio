import React from "react";
import "../styles.css";
import image from "./logo.png";
function Header() {
    return (
        <div className="Header">
            <div className="logo">
                <img src={image} />
            </div>
            <div className="Options">
                <a href="#home">HOME</a>
                <a href="#about">ABOUT</a>
                <a href="#projects">PROJECTS</a>
                <a href="#skills">SKILLS</a>
                <a href="#contact">CONTACT</a>
            </div>
        </div>
    )
};

export default Header;