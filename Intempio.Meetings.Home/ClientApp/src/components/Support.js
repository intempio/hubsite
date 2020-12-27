import React, { Component, useCallback, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import ChatContent from './Chat'
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

export default class Support extends Component {






    constructor(props) {

        super(props);
        this.state = {
            generalMsgKey: '', helpMsgKey: '', messages: [], messagesNew:[], chatUsers: [], channels: [], firstName: '', lastName: '', unrecognizedLogin: false, openchat: false, publishKey: 'pub-c-9a56e351-93a8-4ead-aa4d-68ce24544fbf',
            subscribeKey: 'sub-c-bcc2ede2-482f-11eb-ae10-b69578166507', unseenmsgCount: 0, chatName: 'General', email: '', currentChatKey: ''
        };


    }

    async getSettings() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetMeetingInfo', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (item && item.value[0].fields.GeneralChatName) {

                var cnames = [];

                cnames.push(item.value[0].fields.HelpChatName);
                this.setState({ generalMsgKey: item.value[0].fields.GeneralChatName, helpMsgKey: item.value[0].fields.HelpChatName, channels: cnames, currentChatKey: item.value[0].fields.GeneralChatName });
                this.initiateChat(cnames);

            } else {

                return false;
            }

        }).catch((error) => {
            this.setState({ loading: false });
            return false;
        });
        return finalresult;
    }

    componentDidMount() {

      //  this.getSettings();

        //let token = localStorage.getItem('userToken')
        //token = JSON.parse(token);
        //if (token) {
        //    var fname = token.inputFirstName;
        //    var lname = token.inputLastName;
        //    var email = token.email;
        //    var unrecognizedLogin = token.unrecognizedLogin;

        //    if (token.firstName) {
        //        fname = token.firstName;

        //    }
        //    if (token.lastName) {
        //        lname = token.lastName;
        //    }
        //    this.setState({ firstName: fname, lastName: lname, unrecognizedLogin: unrecognizedLogin, email: email });
        //}


    }




    initiateChat(channelNames) {

        this.pubnubInitiate(channelNames, false,"");
    }

    pubnubInitiate(channelNames, ui,name) {

        const pubnub = new PubNub({
            publishKey: this.state.publishKey,
            subscribeKey: this.state.subscribeKey,

        });


        const channels = channelNames;

 


        pubnub.subscribe({ channels });

        pubnub.addListener({
            message: messageEvent => {

                var farr = this.state.messagesNew;
                farr.push(messageEvent.message)

                this.setState({ messagesNew: farr });

            },
        });

        pubnub.history(
            {
                channel: channels[0],
                count: 100, // 100 is the default
                stringifiedTimeToken: true // false is the default
            },
            (status, response) => {

                this.setState({ messages: response.messages });
                //var uniqueUsers = [];
                //response.messages && response.messages.forEach(x => {
                //    if (uniqueUsers.indexOf(x.entry.user) == -1) {
                //        uniqueUsers.push(x.entry.user);
                //    }
                //});
                //this.setState({ chatUsers: uniqueUsers });
            }
        );

        if (ui) {

            this.setState({ currentChatKey: channels[0], chatName: name, openchat: true });
            const messagesContainer = document.getElementById('messages-container');
            const messagesIcon = document.getElementById('messages-icon');


            const chat = document.getElementById('chat');
            messagesContainer.classList.add('hide');
            messagesIcon.style.fill = '#D7D7D7';
            chat.classList.remove('hide');
        }
    }
    render() {

        console.log(this, "test");
        return (
            <>

             
                <div class="header msgs-container">
                        <h2 class="header">Support</h2>
                    <div class="header msgs-wrapper">

                        {this.state.messagesNew && this.state.messagesNew.slice(0).reverse().map((item, i) => {

                            return (
                                <>
                                    <div class="conversation">
                                        <div class="conversation-wrapper">

                                            <div class="conversation-name">
                                                <span class="name">{item.user}</span>-
                                                <span class="users-number">{item.msg} </span>
                                            </div>
                                        </div>
                                        <div class="conversation-number"> </div>
                                    </div>
                                    <div class="line"></div></>)
                        })
                        }
                        {this.state.messages && this.state.messages.slice(0).reverse().map((item, i) => {

                            return (
                                <>
                                <div class="conversation">
                                    <div class="conversation-wrapper">

                                            <div class="conversation-name" onClick={() => this.pubnubInitiate([item.entry.msg], true, item.entry.user )}>
                                                <span class="name">{item.entry.user}</span>-
                                                <span class="users-number">{item.entry.msg} </span>
                                        </div>
                                    </div>
                                    <div class="conversation-number"> </div>
                                </div>
                                <div class="line"></div></>)
                        })
                        }


                       

                        </div>
                    </div>
         


           
            </>
        );
    }
}
