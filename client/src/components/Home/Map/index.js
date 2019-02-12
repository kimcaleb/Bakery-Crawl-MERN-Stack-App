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
            lat: "",
            lng: ""
        },
        bakeries: [],
        haveBakeryPositions: false,
        zoom:15
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            let {coords: {latitude, longitude} } = position;
            this.setState({location:{lat:latitude,lng:longitude}});
        });
    }


    render() {
        let position = [this.state.location.lat,this.state.location.lng];
        
        return(
            <div className="map">                
                <Map className="map" center={position} worldCopyJump={true} zoom={this.state.zoom} zoomControl={false}>
                    <TileLayer                        
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
                     <Marker position={position} icon={myIcon}>
                        <Popup>You Are Here</Popup>
                     </Marker>
                </Map>
            </div>
        );
    }
}