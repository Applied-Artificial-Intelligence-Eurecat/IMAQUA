import React, {useContext} from "react";
import {Header} from "../components/Header";
import {ThingContext} from "../context/ThingContext";
import {ThingCard} from "../components/ThingCard";
import {CardDeck, Col, Container, Row} from "react-bootstrap";
import "../static/styles/thing.css";
import {MapProvider} from "../context/MapContext";
import Map from "../components/Map";

export const Thing = () => {
    const {things, thingsMap} = useContext(ThingContext);


    const thingsView = things ? things.map((thing, i) => {
        return (
          <ThingCard  key={thing.id} thing={ thing}/>
        )
    }): null;

    console.log(things)

  return (
      <>
          <Header title={'Explore our connected Water Devices'}/>
          <MapProvider>
              <Map center={[50.8503, 4.3517]} zoom={2} data={thingsMap}></Map>
          </MapProvider>
          <CardDeck className={'cardDeck'}>
              {thingsView}
          </CardDeck>

      </>
  );
};