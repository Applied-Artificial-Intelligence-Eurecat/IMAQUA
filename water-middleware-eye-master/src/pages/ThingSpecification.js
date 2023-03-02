import React, {useContext} from "react";
import {useParams} from 'react-router-dom';
import { useLocation } from "react-router";
import {Header} from "../components/Header";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "../static/styles/thingCard.css";
import "../static/styles/thing.css";
import {ThingPropertyContext} from "../context/ThingPropertyContext";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

export const ThingSpecification = (props) => {
    let  history = useHistory();
    const {thingPropData, handleDisconnect} = useContext(ThingPropertyContext);
    let location = useLocation();
    let { id } = useParams();
    let thing = location.state.thing;

    const handleClickTimeline = (thingProp)=>{
        const fields = thing.id.split('/')
        handleDisconnect();
        history.push('/things/'+ fields[fields.length-1]+'/timeline', {thingId: thing.id, property: thingProp});
    }

    const handleClickHistoricvalues = (thingProp) => {
        const fields = thing.id.split('/')
        handleDisconnect();
        history.push('/things/'+ fields[fields.length-1]+'/historic', {thingId: thing.id, property: thingProp});
    }

    const thingProprtiesView = thing.properties ? Object.keys(thing.properties).map((key, i) =>{
        return (
            <Card className={'thingCard'} key={thing.properties[key].id}>
                <Card.Header><b>{thing.properties[key].title}</b></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <span>{thing.properties[key].description}</span>
                    </Card.Text>
                    <div><span><b>Unit: </b>{thing.properties[key].unit}</span></div>
                    {
                        thingPropData.length >0 ? thingPropData.map((item, i)=> Object.keys(item)[0] === thing.properties[key].title? (
                            <>
                                <div key={thing.properties[key].title+i}><span><b>Measurement: </b> {Object.keys(item[thing.properties[key].title]).length >= 0? JSON.stringify(item[thing.properties[key].title]): item[thing.properties[key].title]}</span></div>
                                <div key={'t-'+thing.properties[key].title+i}><span><b>Timestamp: </b> {item['timestamp']}</span></div>
                                {
                                    thing.properties[key].type === 'number' && item[thing.properties[key].title]? (<Button onClick={() => handleClickTimeline(thing.properties[key])}id={'btn-'+thing.properties[key]} variant="outline-info" className="m-1 float-left">Stream Values</Button>): null
                                }
                            </>
                        ): null): null
                    }
                    <Button onClick={() => handleClickHistoricvalues(thing.properties[key])} id="list-dataset" variant="outline-secondary" className="m-1 float-right">Historic Values</Button>
                </Card.Body>
            </Card>
        );
    }): null;

    return (
        <>
            <Header title={id} key={'title'}></Header>
            <CardDeck className={'cardDeck'} key={'ts-key'}>
                {thingProprtiesView}
            </CardDeck>
        </>
    );
}