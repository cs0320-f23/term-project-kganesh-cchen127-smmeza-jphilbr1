import "../styles/navBar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

import Hamburger from "hamburger-react";


function NavBar() {

  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div className="navbar-wrapper">
      <div
        className="navbar"
        style={{
          backgroundColor: "#FECEE9",
          color: "white",
          top: true ? "0" : "-120px",
          borderBottom: `${1} solid #e4e4e4`,
        }}
      >
        <div id="navbar" className="navbar-fixed">
          <Link
            to="landing"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className="logo-link"
          >
            <div className="logo">
              <h1>Byte-sized commodities</h1>
            </div>
          </Link>

          <div className="mobile-menu">
            <Hamburger toggled={isNavExpanded} toggle={setIsNavExpanded} />
          </div>
          <nav
            className={isNavExpanded ? "nav-items expanded" : "nav-items"}
            style={{
              backgroundColor:"#FECEE9",
              top: isNavExpanded ? "0" : "-100%",
              transitionDelay: isNavExpanded ? "0s" : "0s",
            }}
          >
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link
                  to="info"
                  spy={true}
                  smooth={true}
                  offset={-150}
                  duration={500}
                  onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                  }}
                >
                  Info
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link
                  to="map"
                  spy={true}
                  smooth={true}
                  offset={-150}
                  duration={500}
                  onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                  }}
                >
                  Map
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
