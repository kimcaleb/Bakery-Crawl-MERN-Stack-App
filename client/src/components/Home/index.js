import React, { Component } from "react";
import axios from "axios";
import Map from "./Map";

export default class Home extends Component {
    state ={
        user:null
    }

    //Returns User Information
    componentDidMount() {
        axios.get(`/api/users/${this.props.currentUser._id}`)
            .then(res => {
                this.setState({user:res.data.payload});
            });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

    }

    render() {
        let { user } = this.state;
        if(user) {
            return(
                <div className="hero">
                    <h1 className="areyouready">Are You Ready?</h1>
                    <Map />
                </div>
            );
        } else {
            return(
                <div className="hero">
                    <h1>Create Crawl</h1>
                </div>
            );
        }
    }
}