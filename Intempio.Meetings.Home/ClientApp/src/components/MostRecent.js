import React, { Component } from 'react';

export default class MostRecent extends Component {

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }


    componentDidMount() {


    }
    render() {

        return (

            <div class="recent">
                <h3>{this.props.cname}</h3>
                <div class="recent-container">
                    <div class="recent-item">
                        <div class="image-wrapper">
                            <img src={require("../assets/img/recent-icons/recent_1.jpg")} alt="recent_1" class="recent-image" />
                        </div>
                        <div class="recent-info">
                            <p>Supplier Diversity Business Forum</p>
                            <h4>Helix Industry Group Contract List</h4>
                        </div>
                    </div>
                    <div class="recent-item">
                        <div class="image-wrapper">
                            <img src={require("../assets/img/recent-icons/recent_2.jpg")} alt="recent_2" class="recent-image" />
                        </div>
                        <div class="recent-info">
                            <p>Supplier Diversity Business Forum</p>
                            <h4>Helix Industry Group Contract List</h4>
                        </div>
                    </div>
                    <div class="recent-item">
                        <div class="image-wrapper">
                            <img src={require("../assets/img/recent-icons/recent_3.jpg")} alt="recent_3" class="recent-image" />
                        </div>
                        <div class="recent-info">
                            <p>Supplier Diversity Business Forum</p>
                            <h4>Helix Industry Group Contract List</h4>
                        </div>
                    </div>
                    <div class="recent-item">
                        <div class="image-wrapper">
                            <img src={require("../assets/img/recent-icons/recent_3.jpg")} alt="recent_3" class="recent-image" />
                        </div>
                        <div class="recent-info">
                            <p>Supplier Diversity Business Forum</p>
                            <h4>Helix Industry Group Contract List</h4>
                        </div>
                    </div>
                  
                </div>
       
            </div>


        )
    }
}
