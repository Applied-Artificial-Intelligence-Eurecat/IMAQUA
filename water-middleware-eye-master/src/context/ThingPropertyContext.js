import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";

const ThingPropertyContext = React.createContext();

const ThingPropertyContextProvider = (props) => {
    let location = useLocation();
    let thingId = location.state.thing.id;
    let socket;

    const [thingPropData, setThingPropData] = useState([]);

    const handleDisconnect = () => {
        if (socket) socket.close();
    }

    useEffect( () => {
        socket= new WebSocket('ws://'+thingId.split('http://')[1]);
        socket.onmessage = (event) => {
            const recevData = JSON.parse(event.data);
            setThingPropData(prevData => {
                return prevData.length=== 0 ? [
                    ...prevData,
                    recevData.data.measurement
                ]: prevData.filter(item => Object.keys(item)[0] === Object.keys(recevData.data.measurement)[0]).length !== 0? [
                    ...prevData.map(item => {
                        if (Object.keys(item)[0] === Object.keys(recevData.data.measurement)[0])return recevData.data.measurement;
                        return item;
                        })
                   ]: [
                    ...prevData,
                    recevData.data.measurement
                ]
            });
        };

        return () => {
            socket.close();
        }

    }, [])

    return (
        <ThingPropertyContext.Provider value ={{
            thingPropData,
            handleDisconnect
        }}>
            {props.children}
        </ThingPropertyContext.Provider>
    )
};

export {ThingPropertyContext, ThingPropertyContextProvider}