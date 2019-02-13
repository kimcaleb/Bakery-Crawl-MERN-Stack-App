import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

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
        bakeriesForSaving: [],
        haveBakeryPositions: false,
        zoom:9,
        bakeriesForDisplaying:[{geometry:{location:{lat:"",lng:""}}},{geometry:{location:{lat:"",lng:""}}},{geometry:{location:{lat:"",lng:""}}}],
        bakeriesForDisplayingFilled: false
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            let {coords: {latitude, longitude} } = position;
            this.setState({location:{lat:latitude,lng:longitude}});
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { location:{lat,lng}} = this.state;
            let {data:{data:{results}}} = await axios.get(`/places?lat=${lat}&lng=${lng}`);
            //Randomly assign three of the results to bakeriesForDisplay
            let tempArray = [];
            for(let i=0; i<3; i++) {
                tempArray.push(results[Math.floor(Math.random() * results.length)]);
            }
            debugger
            this.setState({bakeriesForDisplaying:tempArray,bakeriesForDisplayingFilled:true});
        } catch(err) {
            console.log(err);
        }
    }

    handleAddCrawl = async (e) => {
        e.preventDefault();
    }





    render() {
        let position = [this.state.location.lat,this.state.location.lng];
        let { bakeriesForDisplaying, bakeriesForDisplayingFilled } = this.state;        
        return(
            <div className="map">                
                <Map className="map" center={position} worldCopyJump={true} zoom={this.state.zoom} zoomControl={false}>
                    <TileLayer                        
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
                     <Marker position={position} icon={myIcon}>
                        <Popup>You Are Here</Popup>
                     </Marker>
                     {(bakeriesForDisplaying.length>0) ? 
                        (
                        <div>
                            <Marker position={[bakeriesForDisplaying[0].geometry.location.lat,bakeriesForDisplaying[0].geometry.location.lng]} icon={destinationIcon}>
                                <Popup>{bakeriesForDisplaying[0].name}</Popup>
                            </Marker>
                            <Marker position={[bakeriesForDisplaying[1].geometry.location.lat,bakeriesForDisplaying[1].geometry.location.lng]} icon={destinationIcon}>
                                <Popup>{bakeriesForDisplaying[1].name}</Popup>
                            </Marker>
                            <Marker position={[bakeriesForDisplaying[2].geometry.location.lat,bakeriesForDisplaying[2].geometry.location.lng]} icon={destinationIcon}>
                                <Popup>{bakeriesForDisplaying[2].name}</Popup>
                            </Marker>
                        </div>
                        ) :
                        (
                         ""
                        )
                    }
                </Map>
                <form onSubmit={this.handleSubmit} className="generatebutton">
                    <input className="btn" type="submit" value="Create Your Crawl"/>
                </form>
                {/*Only display this button if we have bakeries array filled with results */}
                {(bakeriesForDisplayingFilled) ? 
                <form onSubmit={this.handleAddCrawl} className="generatebutton">
                    <input className="btn" type="submit" value="Do This Crawl?"/>
                </form> : ""
                }
            </div>
        );
    }
}