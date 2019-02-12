import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import userLocation from "./user_location.svg";
import destinations from "./destination.svg"

const myIcon = L.icon({
    iconUrl: userLocation,
    iconSize:[50,80]
});

const destinationIcon = L.icon({
    iconUrl: destinations,
    iconSize:[50,80]
});



export default class Map1 extends Component {
    state = {
        location: {
            lat: 34.009399,
            lng: -118.497360
        },
        bakeries: [],
        haveBakeryPositions: false,
        zoom:15
    }


    render() {
        let position = [this.state.location.lat,this.state.location.lng];
        
        return(
            <div className="map">                
                <Map className="map" center={position} worldCopyJump={true} zoom={this.state.zoom} zoomControl={false}>
                    <TileLayer                        
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
                     <Marker position={position} icon={myIcon}>
                        <Popup>Current Location</Popup>
                     </Marker>
                </Map>
            </div>
        );
    }
}