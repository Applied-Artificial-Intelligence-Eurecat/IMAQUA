import React, {useEffect, useState} from "react";
import L from "leaflet";

const MapContext = React.createContext("");

function MapProvider (props){

    const updateMarkers = (layer, markersData) => {
        layer.clearLayers();
        markersData.forEach(marker => {
            var greenIcon = new L.Icon({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${marker.color.toLowerCase()}.png`,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            L.marker(
                marker.latLng,
                { title: marker.title, icon: greenIcon }
            ).addTo(layer);
        });
    };

    const addMarkers = (data) => {
        if (Object.entries(data).length > 0 && data.constructor !== Object){
            console.log (data);
            return data.map(item => {
                return {
                    title: item.title,
                    color: item.color,
                    latLng:{
                        lat: item.geo.lat,
                        lng: item.geo.long
                    }
                }
            });
        }
        else {
            if (Object.entries(data).length > 0 && data.constructor === Object){
                return [{
                    title: data.title,
                    color: data.color,
                    latLng:{
                        lat: data.geo.lat,
                        lng: data.geo.long
                    }
                }];
            }
        }

        return []
    };

    return (
        <MapContext.Provider value={{
            addMarkers,
            updateMarkers
        }}>
            {props.children}
        </MapContext.Provider>
    )
}

export {MapProvider,MapContext}