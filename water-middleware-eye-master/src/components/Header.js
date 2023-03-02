import React from "react"
import "../static/styles/header.css";
import PropTypes from 'prop-types';


export const Header = (props) =>{
    return (
        <header className="masthead text-white text-center">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <h1 className="mb-5">{props.title}</h1>
                    </div>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}