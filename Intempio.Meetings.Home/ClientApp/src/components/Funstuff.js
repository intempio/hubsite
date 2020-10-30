import React, { Component } from 'react';

export default class FunStuff extends Component {

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }


    componentDidMount() {


    }
    render() {

        return (
            <div id="rec02" class="fun-stuff">
                <h3>Fun Stuff</h3>
                <div class="fun-stuff-container">
                    <div class="stuff" style={{ backgroundImage: "url(" + require("./../assets/img/fun-stuff-icons/fun-stuff-icon-1.jpg") + ")" }}>
                        <div class="stuff-info">
                            <h4>Tuesday: Dani Strong!</h4>
                            <p>Join Dani Strong on Tuesday for an intimate virtual desktop concert. Not to be missed!</p>
                        </div>
                    </div>
                    <div class="stuff" style={{ backgroundImage: "url(" + require("./../assets/img/fun-stuff-icons/fun-stuff-icon-2.jpg") + ")" }}>
                        <div class="stuff-info">
                            <h4>Wednesday: Power up Yoga</h4>
                            <p>On Wednesday, get your energy flowing with a virtual yoga studio, broadcast live from East Hanover</p>
                        </div>
                    </div>
                    <div class="stuff" style={{ backgroundImage: "url("+ require("./../assets/img/fun-stuff-icons/fun-stuff-icon-3.jpg") +")"}}>
                        <div class="stuff-info">
                            <h4>We all need a break sometimes. Join online!</h4>
                            <p>Your mocktail is your choice, just join for fun with friends. Your mocktail is your choice, just</p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

