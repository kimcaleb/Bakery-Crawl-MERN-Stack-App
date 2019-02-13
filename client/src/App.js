import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import httpClient from "./utilities/index";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/Signup";
import Logout from "./components/Logout";
import Edit from "./components/Edit";
import Crawls from "./components/Crawls";



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
        <Switch>
          <Route exact path="/" render={props => {
            return <Login {...props} onLoginSuccess={this.onAuthSuccess} />
          }} />
          <Route path="/signup" render={props => {
            return <SignUp {...props} onSignupSuccess={this.onAuthSuccess} />
          }} />
          <Route path="/logout" render={() => {
            return <Logout logOut={this.logOut} />
          }} />
          <Layout currentUser={this.state.currentUser}>
              <Route path="/profile" render={props => {
                return <Home {...props} currentUser={this.state.currentUser} />
              }} />
              <Route exact path="/profile/edit" render={props => {
                return <Edit {...props} currentUser={this.state.currentUser} onLoginSuccess={this.onAuthSuccess} logOut={this.logOut} />
              }} />
              <Route path="/crawls" render={props => {
                return <Crawls {...props} currentUser={this.state.currentUser} />
              }} />
          </Layout>
        </Switch>     
    );
  }
}


