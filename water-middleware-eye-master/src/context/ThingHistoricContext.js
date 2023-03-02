import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import {useParams} from "react-router-dom";
import axios from "axios";

const moment = require("moment");

const ThingHistoricContext = React.createContext();

const ThingHistoricContextProvider = (props) => {
    let location = useLocation();
    let { id } = useParams();
    let thingId = location.state.thingId;
    let thingProperty = location.state.property;
    const serverAPImethod = `${thingId}/properties/${thingProperty.title}`;
    const [timeData, setTimeData] = useState([]);
    const [formValues, setFormValues] = useState({})

    useEffect(  () => {
        async function fetchData() {
            console.log(`${serverAPImethod}?time=${startDate}&timeEnd=${endDate}`)
            const response =  await axios.get(`${serverAPImethod}?time=${startDate}&timeEnd=${endDate}`);
            if (response.status === 200){
                setTimeData(response.data.values);
            }
        }
        const endDate =  moment().toISOString();
        const startDate =  moment().subtract(30, 'days').toISOString();
        fetchData(startDate, endDate);
    }, []);

    const updateFormValues = (event) => {
        const {name, value} = event.target
        setFormValues(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const handleFormClick = async () => {
        console.log(formValues);
        if (!formValues.startDate || !formValues.endDate) return;
        if (Date.parse(new Date(formValues.startDate).toISOString())- Date.parse(new Date(formValues.endDate).toISOString()) > 0) return;

        const response =  await axios.get(`${serverAPImethod}?time=${formValues.startDate}&timeEnd=${formValues.endDate}`);
        if (response.status === 200){
            setTimeData(response.data.values);
        }
    }

    return (
        <ThingHistoricContext.Provider value ={{
            id,
            thingId,
            thingProperty,
            timeData,
            formValues,
            updateFormValues,
            handleFormClick
        }}>
            {props.children}
        </ThingHistoricContext.Provider>
    )

}


export {ThingHistoricContext, ThingHistoricContextProvider}