import React from "react";
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";
import "../static/styles/thingCard.css"
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

export const ThingCard = (props) => {
    let  history = useHistory();

    const handleClickInformation = ()=>{
        const fields = props.thing.id.split('/')
        console.log(fields[fields.length-1])
        history.push('/things/'+ fields[fields.length-1],{thing: props.thing});
    }
  return (
      <Card className={'thingCard'} id={props.thing.id}>
          <Card.Header><h5>{props.thing.id}</h5></Card.Header>
          <Card.Body>
              <Card.Title>{props.thing.title}</Card.Title>
              <Card.Text>{props.thing.description}</Card.Text>
              <Button onClick={handleClickInformation} id={props.thing.id} variant="primary">Information</Button>
          </Card.Body>
      </Card>
  );
};

ThingCard.propTypes = {
    thing: PropTypes.object
}