import React, {useContext, useEffect, useState} from "react";
import L from "leaflet";
import PropTypes from 'prop-types';
import {MapContext} from "../context/MapContext";

function Map(props){
    const {addMarkers,updateMarkers} = useContext(MapContext);

    useEffect( ()=> {
        // create map
        const markersData = addMarkers(props.data);

        const updatedMap= L.map('mapId', {
            center: props.center,
            zoom: props.zoom,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        });

        const layer = L.layerGroup().addTo(updatedMap);
        updateMarkers(layer,markersData);


        return () => {
            updatedMap.off();
            updatedMap.remove();
        }
    },[props.data]);


    return (
        <div id="mapId" />
    )
}

Map.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        color: PropTypes.string,
        geo: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            long: PropTypes.number.isRequired
        })
    })).isRequired
};

export default Map