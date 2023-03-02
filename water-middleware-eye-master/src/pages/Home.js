import React from "react";
import {Header} from "../components/Header";
import "../static/styles/home.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faDesktop, faPlug} from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
    return (
        <>
            <Header title={'IMAQUA semantic HUb for bringing semantic interoperability between water devices'}/>
            <section className="features-icons bg-light text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex">
                                    <FontAwesomeIcon  className="m-auto" icon={faComments} size={'5x'} color={"#007bff"} ></FontAwesomeIcon>
                                </div>
                                <h3>Harmonization</h3>
                                <p className="lead mb-0">Water data harmonization based on data exchange standards to facilitate data exploring</p>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex">
                                    <FontAwesomeIcon className="m-auto icon" icon={faDesktop} size={'5x'} color={"#007bff"} ></FontAwesomeIcon>
                                </div>
                                <h3>Real-time Information</h3>
                                <p className="lead mb-0">Real-time information about your connected water devices.</p>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex">
                                    <FontAwesomeIcon className="m-auto" icon={faPlug} size={'5x'} color={"#007bff"} ></FontAwesomeIcon>
                                </div>
                                <h3>Easy Integration</h3>
                                <p className="lead mb-0">Easy integration of your devices into the platform.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="showcase">
                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-6 order-lg-2 text-white showcase-img showcase-1"></div>
                        <div className="col-lg-6 order-lg-1 showcase-text">
                            <h2><a href={"/things"}>Real-Time Information of the Water Devices</a></h2>
                            <p className="lead mb-0">Explore all connected information from STOP-IT platform</p>
                        </div>
                    </div>
                </div>

                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-6 text-white showcase-img showcase-2"></div>
                        <div className="col-lg-6 showcase-text">
                            <h2><a href={"/things"}>Connect your devices!</a></h2>
                            <p className="lead mb-0">Connect and import your data into the platform.</p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}