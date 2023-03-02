import React  from 'react';
import {Switch, Route} from "react-router-dom"

import './App.css';

import {Navigation} from "./components/Navigation";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Footer} from "./components/Footer";
import {Thing} from "./pages/Things";
import {ThingContextProvider} from "./context/ThingContext";
import {ThingSpecification} from "./pages/ThingSpecification";
import {ThingPropertyContextProvider} from "./context/ThingPropertyContext";
import {Timeline} from "./pages/Timeline";
import {TimelineContextProvider} from "./context/TimelineContext";
import {ThingHistoricValues} from "./pages/ThingHistoricValues";
import {ThingHistoricContextProvider} from "./context/ThingHistoricContext";

function App() {
  return (
      <div >
        <Navigation/>
        <Switch>
            <Route exact path={"/"}>
                <Home />
            </Route>
            <Route path={"/about"}>
                <About />
            </Route>
            <Route path={"/home"}>
                <Home />
            </Route>
            <Route path={"/things/:id/timeline"}>
                <TimelineContextProvider>
                    <Timeline/>
                </TimelineContextProvider>

            </Route>
            <Route path={"/things/:id/historic"}>
                <ThingHistoricContextProvider>
                    <ThingHistoricValues/>
                </ThingHistoricContextProvider>

            </Route>
            <Route path={"/things/:id"}>
                <ThingPropertyContextProvider>
                    <ThingSpecification />
                </ThingPropertyContextProvider>
            </Route>
            <Route path={"/things"}>
                <ThingContextProvider>
                    <Thing />
                </ThingContextProvider>
            </Route>

        </Switch>
        <Footer/>
      </div>
  );
}

export default App;
