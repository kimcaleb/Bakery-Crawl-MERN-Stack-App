import React, { Component } from "react";
import httpClient from "../../utilities/index";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({[name]: value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let user = await httpClient.authenticate(this.state, "/api/users");
        if(user) {
            this.props.onSignupSuccess();
            this.props.history.push("/profile");
        } else {    
            alert("Invalid Email");
        }
    }


    render() {
        let { name, email, password } = this.state;
        return(
            <div className="hero">
                <div className="signup">
                    <h1>Bakery Crawl</h1>
                    <h2>Sign Up</h2>
                    <div className="row">
                        <div className="column column-50 column-offset-25">
                            <form onSubmit={this.handleSubmit}>
                                <input className="input signupinput"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    onChange={this.handleChange}
                                    value={name} />
                                 <input className="input signupinput"
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    onChange={this.handleChange}
                                    value={email} />
                                 <input className="input signupinput"
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={this.handleChange}
                                    value={password} />
                                 <input className="btn" type="submit" />
                                 <h5 className="or">or</h5>                                                                         
                            </form>
                                 <Link to="/">
                                    <input className="btn" type="submit" value="Sign In" />
                                </Link>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}