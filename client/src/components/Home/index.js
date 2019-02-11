import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
    state ={
        user:null
    }

    componentDidMount() {
        axios.get(`/api/users/${this.props.currentUser._id}`)
            .then(res => {
                this.setState({user:res.data.payload});
            });
    }
}