import React, { Component } from "react";
import httpClient from "../../utilities/index";

export default class Login extends Component {
    state = {
        email:"",
        password:""
    }
    
    handleChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]:value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let user = await httpClient.authenticate(this.state, "/api/users/authenticate");
        if (user) {
            this.props.onLoginSuccess();
            this.props.history.push('/profile');
        }
    }

    render() {
        let { email, password } = this.state;
        return(
            <div className="hero">
                <h1>Bakery<br />Crawl</h1>
                <div className="form">
                    <div className="login">
                        <div className="form">
                            <form onSubmit={this.handleSubmit}>
                                <input className="input" 
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    value={email} />
                                <input className="input"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    value={password} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}