import React, { useState } from "react";
import "../styles.css";
import image from "./logo.png";
function Header() {
    const [open, setOpen] = useState(false);
    const toggle = (e) => {
        e.preventDefault();
        setOpen((v) => !v);
    };
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
            {/* Mobile menu button */}
            <button
                className="Header__menuBtn"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="header-dropdown"
                onClick={toggle}
            >
                <span className="bars" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>
            {/* Mobile dropdown */}
            {open && (
                <div id="header-dropdown" className="Header__dropdown" role="menu">
                    <a onClick={() => setOpen(false)} href="#home" role="menuitem">HOME</a>
                    <a onClick={() => setOpen(false)} href="#about" role="menuitem">ABOUT</a>
                    <a onClick={() => setOpen(false)} href="#projects" role="menuitem">PROJECTS</a>
                    <a onClick={() => setOpen(false)} href="#skills" role="menuitem">SKILLS</a>
                    <a onClick={() => setOpen(false)} href="#contact" role="menuitem">CONTACT</a>
                </div>
            )}
        </div>
    )
};

export default Header;