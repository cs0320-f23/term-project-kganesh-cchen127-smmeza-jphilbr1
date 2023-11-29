import "../styles/navBar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

import Hamburger from "hamburger-react";

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function NavBar() {
  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [visible, setVisible] = useState(true);
  // const [textColor, setTextColor] = useState("white");
  // const [bgColor, setBgColor] = useState("transparent");
  // const [borderSize, setBorderSize] = useState("0px");

  // const listenScrollEvent = (event) => {

  //     setTextColor("black");
  //     setBgColor("white");
  //     setBorderSize("1px");
  //     return;
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", listenScrollEvent);

  //   return () =>
  //     window.removeEventListener("scroll", listenScrollEvent);
  // }, []);

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
              <h1>womp womp</h1>
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
              <li className="nav-menu-item">
                <Link
                  to="maps-history"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                  }}
                >
                  History
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
