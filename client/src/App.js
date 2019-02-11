import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import httpClient from "./utilities/index";
import Layout from "./components/Layout";
import Login from "./components/Login";



export default class App extends Component {
  state = {
    currentUser: httpClient.getCurrentUser()
  }

  onAuthSuccess = () => {
    this.setState({
      currentUser:httpClient.getCurrentUser()
    });
  }

  logOut = () => {
    httpClient.logOut();
    this.setState({currentUser:null});
  }

  render() {
    return (
      <Layout currentUser={this.state.currentUser}>
        <Switch>
          <Route exact path="/" render={(props => {
            return <Login {...props} onLoginSuccess={this.onAuthSuccess} />
          })} />
        </Switch>
      </Layout>
    );
  }
}


