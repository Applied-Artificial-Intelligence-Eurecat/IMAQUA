import React from "react"
import {Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import "../static/styles/navigation.css"
import logo from '../static/img/imaqua_logo.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faInfoCircle, faWifi} from "@fortawesome/free-solid-svg-icons";


export const Navigation = () =>{
    return (
        <Navbar className={"nav-color"} expand={"lg"} variant={"light"} fixed="top">
            <Navbar.Brand href="/home">
                <img
                    src={logo}
                    className="d-inline-block align-top"
                    alt="IMAQUA logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faHome} size={'1x'} color={"#007bff"} ></FontAwesomeIcon>
                        &nbsp;Home
                    </Nav.Link>

                    <Nav.Link href="/things">
                        <FontAwesomeIcon icon={faWifi} size={'1x'} color={"#007bff"} ></FontAwesomeIcon>
                        &nbsp;Things
                    </Nav.Link>

                    <Nav.Link href="/about">
                        <FontAwesomeIcon icon={faInfoCircle} size={'1x'} color={"#007bff"} ></FontAwesomeIcon>
                        &nbsp;About
                    </Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}