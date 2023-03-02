import {Header} from "../components/Header";
import React, {useContext, useState} from "react";
import {ThingHistoricContext} from "../context/ThingHistoricContext";
import {Line} from "react-chartjs-2";
import {Col, Form, FormGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const ThingHistoricValues = (props) => {
    const {id, thingProperty, timeData, formValues, updateFormValues, handleFormClick} = useContext(ThingHistoricContext);
    const timestampArray = timeData? timeData.map(item => item.timestamp): [];
    const valueData = timeData? timeData.map(item => item[thingProperty.title]): [];
    const data = {
        labels: timestampArray,
        datasets: [
            {
                label: thingProperty.title,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75, 192, 192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75, 192, 192,1)',
                pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: valueData
            }
        ]
    };

    return (
        <>
            <Header title={id+ 'Historic Values'} key={'title'}></Header>
            <Form id="dataset-form" onChange={updateFormValues}>
                <Row>
                    <Col>
                        <FormGroup controlId="formStartDate">
                            <Form.Control required name="startDate" type="text" placeholder="Enter start date in form of YYYY-MM-DDTHH:MM:ss.SSSZ"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup controlId="formEndDate">
                            <Form.Control required name="endDate" type="text" placeholder="Enter end Date in form of YYYY-MM-DDTHH:MM:ss.SSSZ"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Button onClick={() => handleFormClick()} id="list-dataset" variant="outline-success" class={'mb-2'}>Update Chart</Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <Line data={data}></Line>
        </>
    )
}