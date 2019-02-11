import React, { Component } from "react";
import httpClient from "../../utilities/index";

export default class Edit extends Component {
    state = {
        name: this.props.currentUser.name,
        email: this.props.currentUser.email,
        password: "",
    }
    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({[name]: value });
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let user = await httpClient.updateUser(this.state, `/api/users/${this.props.currentUser._id}`);
        if(user) {
            this.props.onLoginSuccess()
            this.props.history.push("/profile")
        }
    }

    handleDelete = async (e) => {
        e.preventDefault()
        let user = await httpClient.deleteUser(this.state,`/api/users/${this.props.currentUser._id}`)
        if (user) {
          this.props.history.push("/")
          this.props.logOut()
        }
    }
    render() {
        let { name, email, password } = this.state;
        return(
            <div className="hero">
                <div className="login">
                    <h1>Bakery Crawl</h1>
                    <h3>Edit Profile</h3>
                    <div className="row">
                        <div className="column column-50 column-offset-25">
                            <form onSubmit={this.handleSubmit}>
                                <label>Name</label>
                                <input className="input editinput"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={name} />
                                <label>Email</label>
                                <input className="input editinput"
                                    type="text"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={email} />
                                <label>Password</label>    
                                <input className="input editinput"
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={password} />
                                <input type="submit" className="btn" />
                                <h5 className="or">or</h5>                                         
                            </form>
                            <form onSubmit={this.handleDelete}>
                                <input type="submit" value="Delete Profile" className="btn" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}