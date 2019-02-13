import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import httpClient from "../../../utilities/index";
import Results from "./Crawl";
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
        haveBakeryPositions: false,
        zoom:9,
        bakeries:[{geometry:{location:{lat:"",lng:""}}},{geometry:{location:{lat:"",lng:""}}},{geometry:{location:{lat:"",lng:""}}}],
        bakeriesFilled: false, 
        bakeryAdded: false
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
            this.setState({bakeries:tempArray,bakeriesFilled:true});
        } catch(err) {
            console.log(err);
        }
    }

    handleAddCrawl = async (e) => {
        e.preventDefault();
        let res = await httpClient.addCrawl(this.state, "/api/crawls");
        this.setState({bakeryAdded:true,bakeries:res.bakeries, bakeriesFilled:false});
    }





    render() {
        let position = [this.state.location.lat,this.state.location.lng];
        let { bakeries, bakeriesFilled, bakeryAdded } = this.state;        
        return(
            <div className="map">                
                <Map className="map" center={position} worldCopyJump={true} zoom={this.state.zoom} zoomControl={false}>
                    <TileLayer                        
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
                     <Marker position={position} icon={myIcon}>
                        <Popup>You Are Here</Popup>
                     </Marker>
                     {(bakeries.length>0) ? 
                        (
                        <div>
                            <Marker position={[bakeries[0].geometry.location.lat,bakeries[0].geometry.location.lng]} icon={destinationIcon}>
                                <Popup>{bakeries[0].name}</Popup>
                            </Marker>
                            <Marker position={[bakeries[1].geometry.location.lat,bakeries[1].geometry.location.lng]} icon={destinationIcon}>
                                <Popup>{bakeries[1].name}</Popup>
                            </Marker>
                            <Marker position={[bakeries[2].geometry.location.lat,bakeries[2].geometry.location.lng]} icon={destinationIcon}>
                                <Popup>{bakeries[2].name}</Popup>
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
                {(bakeriesFilled) ? 
                <form onSubmit={this.handleAddCrawl} className="generatebutton">
                    <input className="btn" type="submit" value="Do This Crawl?"/>
                </form> : ""
                }
                {(bakeryAdded) ?
                <div className="border">
                    <div className="imgcon">
                        <h3 className='results-title'>{bakeries[0].name}</h3>
                        <p>{bakeries[0].vicinity}</p>
                        <p>{bakeries[0].rating}/5, Total Reviews:{bakeries[0].user_ratings_total}</p>
                        <div className="results-bottom">
                        <img src={`${bakeries[0].icon}`} alt="Not Available" />
                        
                        </div>
                    </div>
                    <div className="imgcon">
                        <h3 className='results-title'>{bakeries[1].name}</h3>
                        <p>{bakeries[1].vicinity}</p>
                        <p>{bakeries[1].rating}/5, Total Reviews:{bakeries[1].user_ratings_total}</p>
                        <div className="results-bottom">
                        <img src={`${bakeries[1].icon}`} alt="Not Available" />
                        </div>
                    </div>
                    <div className="imgcon">
                        <h3 className='results-title'>{bakeries[2].name}</h3>
                        <p>{bakeries[2].vicinity}</p>
                        <p>{bakeries[2].rating}/5, Total Reviews:{bakeries[2].user_ratings_total}</p>
                        <div className="results-bottom">
                        <img src={`${bakeries[2].icon}`} alt="Not Available" />
                        </div>
                    </div>
                </div> : 
                ""
                }
            </div>
        );
    }
}