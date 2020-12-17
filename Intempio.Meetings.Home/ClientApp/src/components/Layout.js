import React, { Component, useCallback, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import ChatContent from './Chat'
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

import _, { forEach } from 'lodash';
import { ActivityLog } from './ActivityLog';

export class Layout extends Component {
    static displayName = Layout.name;






    constructor(props) {

        super(props);
        this.state = {
            generalMsgKey: '', helpMsgKey: '', messages: [], firstName: '', lastName: '', unrecognizedLogin: false, openchat: false, publishKey: 'pub-c-85a423af-7715-4ec1-b8e2-17c496843384', loading: true,
            subscribeKey: 'sub-c-f9bb468c-0666-11eb-8c73-de77696b0464', unseenmsgCount: 0, chatName: 'General', chatUsers: [], helpRequests: [], helpRequestsFiltered: [], currentChatKey: '', messagesHelp: [], messagesHelpNew: [], email: '', isSupport: false, subscribeList: [], subscribeList2: [], customChatRooms: [],
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

                this.setState({ generalMsgKey: item.value[0].fields.GeneralChatName, helpMsgKey: item.value[0].fields.HelpChatName, currentChatKey: item.value[0].fields.GeneralChatName });

                var cnames = [];
                cnames.push(item.value[0].fields.GeneralChatName);
                cnames.push(item.value[0].fields.HelpChatName);

                this.initiateChat(cnames);
                this.pubnubHelpInitiate([item.value[0].fields.HelpChatName]);
            } else {

                return false;
            }

        }).catch((error) => {
            this.setState({ loading: false });
            return false;
        });
        return finalresult;
    }



    async getSettingsv2() {




        this.setState({ loading: true });
        const response = await fetch('Meeting/GetConfigInfo?validate=0&key=' + this.state.key, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = resonse.value;
            this.setState({ loading: false });


            if (item) {

                this.setState({ loading: false, generalMsgKey: item.intempioSettings.generalChatName, helpMsgKey: item.intempioSettings.helpChatName, currentChatKey: item.intempioSettings.generalChatName, customChatRooms: item.intempioSettings.customChatGroups.split(',') });
                var cnames = [];
                cnames.push(item.intempioSettings.generalChatName);
                cnames.push(item.intempioSettings.helpChatName);

                this.initiateChat(cnames);
                this.pubnubHelpInitiate([item.intempioSettings.helpChatName]);

            } else {


                return false;
            }

        }).catch((error) => {
            return false;
            this.setState({ loading: false });
        });
        return finalresult;
    }

    componentDidMount() {

        this.getSettingsv2();

        let token = localStorage.getItem('userToken')
        token = JSON.parse(token);
        if (token) {
            var fname = token.inputFirstName;
            var lname = token.inputLastName;
            var email = token.email;
            this.setState({ isSupport: email.toLowerCase().indexOf('support') > -1 });

            var unrecognizedLogin = token.unrecognizedLogin;

            if (token.firstName) {
                fname = token.firstName;

            }
            if (token.lastName) {
                lname = token.lastName;
            }
            this.setState({ firstName: fname, lastName: lname, unrecognizedLogin: unrecognizedLogin, unseenmsgCount: 0, email: email });
        }
    }


    initiateChat(channelNames) {
        const messagesContainer = document.getElementById('messages-container');
        const messagesIcon = document.getElementById('messages-icon');

        const generalSession = document.getElementById('general-session');
        const chat = document.getElementById('chat');

        generalSession.addEventListener('click', () => {

            this.setState({ openchat: true })
            messagesContainer.classList.add('hide');
            messagesIcon.style.fill = '#D7D7D7';
            chat.classList.remove('hide');
        
            this.setState({ unseenmsgCount: 0, currentChatKey: this.state.generalMsgKey, chatName: 'General' });

            ActivityLog.getStringValue(this.state.email, "ChatClicked", channelNames[0]);
        })

        const chatGeneralClose = document.getElementById('chat-general-close');

        chatGeneralClose.addEventListener('click', () => {
            chat.classList.add('hide');
        })

        const helpSession = document.getElementById('help-session');
        helpSession.addEventListener('click', () => {

            this.sendHelpMsg("msg");
   

        })
        this.pubnubInitiate(channelNames);
    }

    pubnubInitiate(channelNames) {

        const chat = document.getElementById('chat');

        const pubnub = new PubNub({
            publishKey: this.state.publishKey,
            subscribeKey: this.state.subscribeKey,

        });

        const channels = channelNames;

        pubnub.addListener({
            message: messageEvent => {

                if (window.getComputedStyle(chat).display === "none") {

                    this.setState({ unseenmsgCount: this.state.unseenmsgCount + 1 });
                }
                else {
                    this.setState({ unseenmsgCount: 0 });
                }
                var msg = messageEvent.message;
            },
        });

        pubnub.unsubscribe({ channel: channels[0] });

        var s = [];
        var t = this.state.subscribeList;
        channels.forEach(i => {

            if (!_.includes(this.state.subscribeList, i)) {
                s.push(i);
                t.push(i);
            }
        });

        this.setState({ subscribeList: t });
        if (s.length > 0) {
            pubnub.subscribe({ channels: s });
        }

        pubnub.history(
            {
                channel: channels[0],
                count: 100, // 100 is the default
                stringifiedTimeToken: true // false is the default
            },
            (status, response) => {

                this.setState({ messages: response });

                var uniqueUsers = [];
                response && response.messages && response.messages.forEach(x => {
                    if (uniqueUsers.indexOf(x.entry.user) == -1) {
                        uniqueUsers.push(x.entry.user);
                    }
                });
                this.setState({ chatUsers: uniqueUsers });
            }
        );

    }



    sendHelpMsg(category) {
        const pubnub2 = new PubNub({
            publishKey: this.state.publishKey,
            subscribeKey: this.state.subscribeKey,

        });
        var msgid = this.state.email + Date.now();
        var tmsg = this.state.email + '_' + this.state.helpMsgKey;
        pubnub2.publish({
            message_id: msgid,
            channel: [this.state.helpMsgKey],
            message: { msg: tmsg, user: this.state.firstName + ' ' + this.state.lastName, category: category, id: msgid }
            , original_timetoken: Date.now() / 1000,
            user: this.state.fname + ' ' + this.state.lname,
            status: "help",
            deleted: false,
            is_update: false
        });


        this.openChatWindw([tmsg]);

    }

    openChatChatandFixUI(channelNames, id) {

        this.openChatWindw(channelNames);
        const messagesIndicator = document.getElementById('c' + id);

        messagesIndicator.classList.remove('conversation-number-help');

        messagesIndicator.classList.add('conversation-number-help-done');
    }

    openChatChatandSetGroup(channelNames, key, name) {

        this.openChatWindw(channelNames);

        this.setState({ currentChatKey: key, chatName: name })
            ;
    }

    openChatWindw(channelNames) {

        this.pubnubInitiate(channelNames);

        this.setState({ currentChatKey: channelNames[0], chatName: "Help", openchat: true });
        const messagesContainer = document.getElementById('messages-container');
        const messagesIcon = document.getElementById('messages-icon');


        const chat = document.getElementById('chat');
        messagesContainer.classList.add('hide');
        messagesIcon.style.fill = '#D7D7D7';
        chat.classList.remove('hide');

        ActivityLog.getStringValue(this.state.email, "ChatClicked", channelNames[0]);
    }


    pubnubHelpInitiate(channelNames) {

        const pubnub2 = new PubNub({
            publishKey: this.state.publishKey,
            subscribeKey: this.state.subscribeKey,

        });

        const channels = channelNames;

        pubnub2.addListener({
            message: messageEvent => {
                var m = messageEvent.message;
                var msgs = this.state.messagesHelpNew;
                msgs.push(m);
                var uniqs = _.uniqBy(msgs, 'user');
                this.setState({ messagesHelpNew: msgs, helpRequestsFiltered: uniqs });
            },
        });
        // pubnub2.unsubscribe({ channel: channels[0] });



        var s = [];
        var t = this.state.subscribeList2;
        channels.forEach(i => {

            if (!_.includes(this.state.subscribeList2, i)) {
                s.push(i);
                t.push(i);
            }
        });

        this.setState({ subscribeList2: t });
        if (s.length > 0) {
            pubnub2.subscribe({ channels: s });
        }

        pubnub2.history(
            {
                channel: channels[0],
                count: 100, // 100 is the default
                stringifiedTimeToken: true // false is the default
            },
            (status, response) => {

                this.setState({ messagesHelp: response.messages });

                var uniqueUsers = _.uniqBy(response.messages, 'user');

                this.setState({ helpRequests: uniqueUsers });
            }
        );
    }

    changMenuColour(control) {


    }

    render() {
        return (
            <>
                {this.state.loading ? <header class="skelleton-header">

                    <div id="messages" class="msgs">
                        <div class="msgs-number">
                        </div>
                        <div class="skelleton-loading msgs-svg"></div>
                    </div>

                    <div class="vertical-line"></div>
                    <div class="msgs">
                        <div class="msgs-number">
                        </div>
                        <div class="skelleton-loading msgs-svg"></div>
                    </div>
                    <div class="vertical-line"></div>
                    <div class="skelleton-loading user-name"></div>
                    <div class="skelleton-loading user-avatar">
                    </div>




                </header> :
                    <header>
                        <div id="messages" class="msgs">
                            <div class="msgs-number">
                                {this.state.unseenmsgCount}
                            </div>
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="messages-icon" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M16.6534 14.915H9.58143C9.16009 15.3843 8.65609 15.9256 8.18676 16.4563C7.12276 17.659 4.62943 18.6483 4.26676 18.7443C3.90409 18.8403 2.93609 18.7923 3.51743 18.1176C4.09876 17.443 4.67743 15.7096 4.67743 14.915H3.00809C1.46676 14.915 0.202759 13.659 0.202759 12.1203V3.16297C0.202759 1.62697 1.46676 0.370972 3.00809 0.370972H16.6534C18.1974 0.370972 19.4614 1.62697 19.4614 3.16297V12.1203C19.4614 13.659 18.1974 14.915 16.6534 14.915ZM14.5734 6.14964C13.8268 6.14964 13.2188 6.75231 13.2188 7.49897C13.2188 8.24297 13.8268 8.84564 14.5734 8.84564C15.3228 8.84564 15.9281 8.24297 15.9281 7.49897C15.9281 6.75231 15.3228 6.14964 14.5734 6.14964ZM9.92809 6.29364C9.18143 6.29364 8.57343 6.89897 8.57343 7.64297C8.57343 8.38697 9.18143 8.99231 9.92809 8.99231C10.6774 8.99231 11.2828 8.38697 11.2828 7.64297C11.2828 6.89897 10.6774 6.29364 9.92809 6.29364ZM5.28276 6.43764C4.53609 6.43764 3.92809 7.04297 3.92809 7.78697C3.92809 8.53097 4.53609 9.13631 5.28276 9.13631C6.03209 9.13631 6.63743 8.53097 6.63743 7.78697C6.63743 7.04297 6.03209 6.43764 5.28276 6.43764ZM21.5894 5.04297H21.1921C21.2081 5.15231 21.2161 5.26431 21.2161 5.37897V13.9043C21.2161 15.3336 20.0401 16.5043 18.6028 16.5043H10.3628C9.82676 17.0856 8.92809 18.059 8.92809 18.059C8.92809 18.059 9.21609 18.7683 10.1228 18.7683H17.3548C17.6294 19.643 18.3654 20.3763 18.8561 20.755C19.3894 21.163 20.3201 21.7283 21.0934 21.7656C21.8668 21.8003 21.9521 21.5496 21.8188 21.379C21.6854 21.211 21.2988 20.2963 21.1414 19.8856C21.0401 19.6216 21.0508 19.1016 21.0694 18.7683H21.5894C23.0268 18.7683 24.2028 17.5976 24.2028 16.1656V7.64297C24.2028 6.21097 23.0268 5.04297 21.5894 5.04297Z"
                                    fill={this.state.unseenmsgCount > 0 ? "#EC9A1D" : "#D9D9D9"} />
                            </svg>
                        </div>
                        <div id="messages-container" class="msgs-container hide">
                            <h2 class="header">conversation</h2>
                            <label for="searchBar">
                                <input type="text" id="searchBar" class="search-bar" placeholder="Search contact or group" onChange={(e) => this.setState({
                                    helpRequestsFiltered: _.uniqBy(this.state.messagesHelpNew, 'user').filter(function (item) {
                                        return item.user.indexOf(e.target.value) > -1 && item.category == "msg";
                                    })
                                })} />
                            </label>
                            <div class="msgs-wrapper">

                                <div id="general-session" class="conversation">
                                    <div class="conversation-wrapper">
                                        <div class="images">
                                            <img class="firstImg" src={require("../assets/img/associated_photo3.png")} alt="associated_photo" />
                                            <img class="secondImg" src={require("../assets/img/associated_photo2.png")} alt="associated_photo" />
                                        </div>
                                        <div class="conversation-name">
                                            <span class="name">General</span>
                                            <span class="users-number">{this.state.chatUsers.length} users</span>
                                        </div>
                                    </div>
                                    <div class="conversation-number">{this.state.unseenmsgCount}</div>
                                </div>
                                <div class="line"></div>
                                <div id="help-session" class="conversation">
                                    <div class="conversation-wrapper">
                                        <div class="images">
                                            <img class="firstImg" src={require("../assets/img/associated_photo4.png")} alt="associated_photo" />
                                            <img class="secondImg" src={require("../assets/img/associated_photo5.png")} alt="associated_photo" />
                                        </div>
                                        <div class="conversation-name">
                                            <span class="name">Help</span>
                                            <span class="users-number">{this.state.helpRequests.length} users</span>
                                        </div>
                                    </div>
                                </div>

                                {this.state.isSupport && this.state.helpRequestsFiltered && this.state.helpRequestsFiltered.slice(0).reverse().map((m, messageIndex) => {

                                    return (

                                        <>
                                            <div class="line"></div>
                                            <div class="conversation">
                                                <div class="conversation-wrapper">
                                                    <div class="images">
                                                        <img class="firstImg" src={require("../assets/img/associated_photo4.png")} alt="associated_photo" />
                                                        <img class="secondImg" src={require("../assets/img/associated_photo5.png")} alt="associated_photo" />
                                                    </div>
                                                    <div class="conversation-name" onClick={() => this.openChatChatandFixUI([m.msg], m.id)} id={m.id}>
                                                        <span class="name">{m.user}</span>
                                                        <span class="users-number">{m.msg}</span>
                                                    </div>
                                                </div>

                                                <div class="conversation-number-help" id={'c' + m.id}></div>
                                            </div>


                                        </>

                                    );
                                })}


                                {this.state.customChatRooms && this.state.customChatRooms.map((x, messageIndex) => {

                                    var gcitem = x.split('>');
                                    var chatKey = '';
                                    var chatText = '';
                                    var users = '';
                                    if (gcitem.length == 3) {
                                        chatKey = gcitem[0];
                                        chatText = gcitem[1];
                                        users = gcitem[2];
                                    }

                                    var displaygorup = users.indexOf(this.state.email) > -1;


                                    return (
                                        displaygorup ?
                                            <>
                                                <div class="line"></div>
                                                <div class="conversation">
                                                    <div class="conversation-wrapper">
                                                        <div class="images">
                                                            <img class="firstImg" src={require("../assets/img/associated_photo4.png")} alt="associated_photo" />
                                                            <img class="secondImg" src={require("../assets/img/associated_photo5.png")} alt="associated_photo" />
                                                        </div>
                                                        <div class="conversation-name" onClick={() => this.openChatChatandSetGroup([chatKey], chatKey, chatText)} id={chatKey + messageIndex.toString()}>
                                                            <span class="name">{chatText}</span>
                                                            <span class="users-number">{users.split(';').length}</span>
                                                        </div>
                                                    </div>

                                                    <div class="conversation-number" ></div>
                                                </div>


                                            </> : <></>

                                    );
                                })}

                            </div>
                        </div>
                        <div class="vertical-line"></div>

                        <div class="user-name">{this.state.firstName} {this.state.lastName}</div>
                        <div class="user-avatar">

                        </div>



                        <NavMenu msgCount={this.state.unseenmsgCount} email={this.state.email} />

                        {this.state.currentChatKey != '' && this.state.currentChatKey != undefined && <ChatContent openChat={this.state.openchat} chatKey={this.state.currentChatKey} publishKey={this.state.publishKey} subscribeKey={this.state.subscribeKey} chatName={this.state.chatName} />}

                    </header>}

                <div id="wrapper" class="wrapper">

                    <main>
                        {this.props.children}
                    </main>
                </div>
                <footer id="footer">

                </footer>
            </>
        );
    }
}
