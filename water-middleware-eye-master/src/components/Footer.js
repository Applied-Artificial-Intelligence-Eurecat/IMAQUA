import React from "react"
import "../static/styles/footer.css";
import logo from "../static/img/accio_logo.png";
import federLogo from "../static/img/feder-logo.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare, faLinkedinIn, faTwitterSquare} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
      <>
          <footer className="footer bg-light">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-6 h-100 text-center text-lg-left auto">
                          <img
                              src={logo}
                              className="d-inline-block"
                              alt="ACCIÓ logo"
                          />
                          <img
                              src={federLogo}
                              className="d-inline-block"
                              alt="FEDER logo"
                          />
                      </div>
                      <div className="col-lg-6 h-100 text-center text-lg-right auto">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item mr-3">
                                  <a href="https://www.facebook.com/Stop-It-Project-2120279041552329/">
                                      <FontAwesomeIcon icon={faFacebookSquare} size={'2x'} color={"#007bff"} ></FontAwesomeIcon>
                                  </a>
                              </li>
                              <li className="list-inline-item mr-3">
                                  <a href="https://twitter.com/STOPIT_Project">
                                      <FontAwesomeIcon icon={faTwitterSquare} size={'2x'} color={"#007bff"} ></FontAwesomeIcon>
                                  </a>
                              </li>
                              <li className="list-inline-item mr-3">
                                  <a href="https://www.linkedin.com/in/stop-it-project/">
                                      <FontAwesomeIcon icon={faLinkedinIn} size={'2x'} color={"#007bff"} ></FontAwesomeIcon>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </footer>
      </>
  );
};