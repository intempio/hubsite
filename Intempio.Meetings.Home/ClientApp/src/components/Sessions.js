﻿import React, { Component } from 'react';
//import moment from 'moment';
import moment from 'moment-timezone';
export default class Session extends Component {

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, events: null, filteredevents: null, email:''};

     
    }

     openInNewTab = (url)=> {
         const newWindow = window.open(url.Url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    async getEvents() {
        let token = localStorage.getItem('userToken')
        let email = '';
        token = JSON.parse(token);
        if (token) {
            email = token.email;
        }

        var url = 'Meeting/GetMeetings';
        if (!this.props.allEvents) {
            url = 'Meeting/GetUserEventsByEmail?email=' + email;
        }
     //   url = 'Meeting/GetMeetings';
        const response = await fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

   
        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (item ) {
                this.setState({ events: item, filteredevents: item });
                return true;

            } else {
                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }


    getallevents = () => {

        this.setState({ filteredevents: this.state.events });
        const currentfilter = document.getElementById('currentFilter');
        currentfilter.innerText = "Show all events";
        const dropdown = document.getElementById('dropdown');
        dropdown.classList.add('hide');
        const selectorArrow = document.getElementById('selector-arrow');
        selectorArrow.style.transform = 'rotate(180deg)';
    }
    gettodayslevents = () => {

        console.log(moment().startOf('day'));
        console.log(moment().add(1, 'days').startOf('day'));



        this.setState({
            filteredevents: this.state.events ? this.state.events.filter((item) => {
                return moment(item.fields.StartTime).toDate() > moment().startOf('day') &&
                    moment(item.fields.StartTime).toDate() < moment().add(1, 'days').startOf('day');
            }) : []
        });
        const currentfilter = document.getElementById('currentFilter');
        currentfilter.innerText = "Today's events";
        const dropdown = document.getElementById('dropdown');
        dropdown.classList.add('hide');
        const selectorArrow = document.getElementById('selector-arrow');
        selectorArrow.style.transform = 'rotate(180deg)';
    }
    componentDidMount() {

       

        this.getEvents();
        const dropdown = document.getElementById('dropdown');
        const selector = document.getElementById('selector');

        selector.addEventListener('click', () => {
            const selectorArrow = document.getElementById('selector-arrow');
            if (dropdown.classList.contains('hide')) {
                dropdown.classList.remove('hide');
                selectorArrow.style.transform = 'rotate(0)';
            } else {
                dropdown.classList.add('hide');
                selectorArrow.style.transform = 'rotate(180deg)';
            }
        });

    }
    render() {

        return (

            <div class="sessions">
                <div class="sessions-header">
                    <h3>{this.props.cname}</h3>
                    <div class="sessions-selector">
                        <div id="selector" class="selector">
                            <svg class="filter"
                                width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.8938 0.667367C15.7045 0.255786 15.3038 0 14.8486 0H1.15154C0.696153 0 0.295618 0.255786 0.106112 0.667367C-0.0818706 1.07552 -0.0169242 1.54138 0.275811 1.88344C0.276001 1.88364 0.276382 1.88402 0.276572 1.88421L5.71455 8.21105V13.1416C5.71455 13.3523 5.83053 13.546 6.01642 13.6456C6.1006 13.6907 6.19355 13.713 6.28592 13.713C6.39677 13.713 6.50723 13.6806 6.60284 13.617L10.0311 11.3315C10.1901 11.2254 10.2856 11.0472 10.2856 10.8561V8.21105L15.7243 1.88344C16.0168 1.54138 16.082 1.07552 15.8938 0.667367Z"
                                    fill="#C2C2C2" />
                            </svg>
                            <span id="currentFilter">Show all events</span>
                            <svg id="selector-arrow" class="arrow"
                                width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 6.55053L5.8495 1.40002L1 6.55053" stroke="#A6A6A6" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div id="dropdown" class="dropdown hide">
                            <div class="dropdown-item" onClick={() => { this.getallevents() }}>

                                <span>Show all events</span>
                            </div>
                            <div class="dropdown-item" onClick={() => { this.gettodayslevents() }}>

                                <span>Today's events</span>
                            </div>

                        </div>
                    </div>
                </div>
                {this.state.loading && <div class="sessions-item">loading...</div>}

                {this.state.filteredevents && this.state.filteredevents.length==0 && <div class="sessions-item"> There are no events to display...</div>}
                {


                    this.state.filteredevents && this.state.filteredevents.map( (item, i)=> {

                    //    var item = JSON.parse(item.fields);
                        

                        var a = item;
                       // var momentObj = moment.tz(item.fields.StartTime, 'America/New_York');
                      var  momentObj = moment.utc(item.fields.StartTime);
                        ////Apply Moment.Js Formatter to your desire date format
                        var formattedStartTime = momentObj.local().format('hh:mm A');
                        var formattedDate = momentObj.local().format('DD MMM');
                      //  var momentObj = moment.tz(item.fields.FinishTime, 'America/New_York');
                        momentObj = moment.utc(item.fields.FinishTime);
                        var formattedEndTime = momentObj.local().format('hh:mm A');
                     
                        return (<div class="sessions-item">
                            <div class="sessions-time">
                                <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M36 4H34V0H30V4H10V0H6V4H4C1.8 4 0 5.8 0 8V40C0 42.2 1.8 44 4 44H36C38.2 44 40 42.2 40 40V8C40 5.8 38.2 4 36 4ZM36 40H4V14H36V40Z"
                                        fill="#C2C2C2" />
                                </svg>
                                <span class="time">{formattedStartTime} -{formattedEndTime}</span>
                                <span class="date">{formattedDate}</span>
                            </div>
                            <div class="sessions-information">
                                <h3>{item.fields.Channel}</h3>
                                <p>{item.fields.Description}</p>
                            </div>
                            <div className="sessions-item-button">
                                <button onClick={() => this.openInNewTab(item.fields.EventURL)}>Join Session</button></div>
                        </div>);
   
                    })}
              
              
       
            </div>

        )
    }
}



