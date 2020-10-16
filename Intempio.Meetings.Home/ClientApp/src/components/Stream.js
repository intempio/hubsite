import React, { Component } from 'react';

export default class Stream extends Component {

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }


    componentDidMount() {


    }
    render() {

        return (
            <div class="stream">
                <h3>Microsoft Stream</h3>
                <img src={require("../assets/img/microsoft-stream-icons/stream-icon.jpg")} alt="stream"/>
      </div>

        )
    }
}

