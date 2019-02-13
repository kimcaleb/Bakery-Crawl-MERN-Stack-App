import React, { Component } from "react";
import axios from "axios";

export default class Crawls extends Component {
    state = {
        allCrawls: []
    }

    componentDidMount() {
        axios.get(`/api/users/${this.props.currentUser._id}/crawls`).then(res => {
            let {data:{user:{crawls}}} = res;
            this.setState({allCrawls:crawls});
            console.log(this.state.allCrawls);
        }).catch(err => {console.log(err)});
    }

    renderCrawl(allCrawls) {
       return allCrawls.map((crawl,index) => {
            return crawl.bakeries.map((bakery,index) => {
                return(
                    <div className="imgcon" key={index}>
                        <h3 className='results-title' >{bakery.name}</h3>
                        <p >{bakery.vicinity}</p>
                        <p >{bakery.rating}/5, Total Reviews:{bakery.user_ratings_total}</p>
                        <div className="results-bottom" >
                            <img src={`${bakery.icon}`} alt="Not Available" />       
                        </div>
                    </div>
                    );
                    
            })         
        })
    }

    render() {
        let {allCrawls} = this.state;
        debugger
        return(
        <div>
            <h1 className="areyouready">Crawl History</h1>
            <div className="border1">
                {allCrawls.length>0 ? this.renderCrawl(allCrawls) : <h1></h1>}
            </div>
        </div>  
        );
    }
}