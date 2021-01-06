import React, { Component, useCallback, useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import moment from 'moment-timezone';
import { Alert } from 'reactstrap';

import _, { forEach } from 'lodash';
var pubnub = new PubNub({
    publishKey: 'a',
    subscribeKey: 'v',

});

var channels = ['help2'];

var userMe = false;

var currentUser = '';

export const Chat = ({ openChat, chatKey, publishKey, subscribeKey, chatName }) => {

    channels = [chatKey];

    moment.updateLocale('en', {
        longDateFormat: {
            LTY: 'MM/DD HH:mm',  // new format for token here
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "MM/DD/YYYY",
            LL: "MMMM Do YYYY",
            LLL: "MMMM Do YYYY LT",
            LLLL: "dddd, MMMM Do YYYY LT"
        }
    });

    let token = localStorage.getItem('userToken')
    let fname = '';
    let lname = '';

    token = JSON.parse(token);
    if (token) {
        fname = token.inputFirstName;
        lname = token.inputLastName;
        if (token.firstName) {
            fname = token.firstName;

        }
        if (token.lastName) {
            lname = token.lastName;
        }
    }
    const pubnub = usePubNub();
    const [messages, setMessages] = useState([]);
    const [replyMsg, setReplyMsg] = useState('');
    const [msgHistory, setMgsHistory] = useState(null);
    const [input, setInput] = useState({});
    const [users, setUsers] = useState([]);
    const [oldChatKey, setoldChatKey] = useState('');
    const [subscribeList, setSubscribeList] = useState([]);


    const messagesRef = React.useRef(null);
    const scrollToBottom = () => {

        messagesRef.current && messagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    };





    useEffect(() => {

        scrollToBottom();

    }, [openChat]);


    useEffect(() => {
        console.log(channels[0]);
        if (channels[0] != undefined && channels[0] != '') {

            setMgsHistory(null);
            setMessages([]);
            pubnub.history(
                {
                    channel: channels[0],
                    count: 100, // 100 is the default
                    stringifiedTimeToken: true // false is the default
                },
                (status, response) => {
                    console.log(response);
                    setMgsHistory(response);
                    scrollToBottom();
                }
            );

            if (oldChatKey != channels[0]) {

                pubnub.addListener({
                    message: messageEvent => {

                        if (messageEvent.channel === channels[0]) {
                            setMessages(messages => [...messages, messageEvent.message]);
                            scrollToBottom();
                        }

                        setoldChatKey(channels[0]);
                    },
                });

                //pubnub.unsubscribeAll();
                //pubnub.unsubscribe({ channel: channels[0] });
                //pubnub.subscribe({ channels });

                var s = [];
                var t = subscribeList;
                channels.forEach(i => {

                    if (!_.includes(t, i)) {
                        s.push(i);
                        t.push(i);
                    }
                });

                setSubscribeList([...t]);
                if (s.length > 0) {
                    pubnub.subscribe({ channels: s });
                }
            }
            if (oldChatKey != undefined && oldChatKey != '') {


            }



        }
    }, [channels[0]]);


    useEffect(() => {
        if (msgHistory && msgHistory.messages && msgHistory.messages.length > 0) {
            var tempArray = users;
            msgHistory.messages.forEach(x => {
                if (tempArray.indexOf(x.entry.user) == -1) {
                    tempArray.push(x.entry.user);
                }
            });

            setUsers(tempArray);
        }

    }, [msgHistory && msgHistory.messages]);

    useEffect(() => {


        window.addEventListener("beforeunload", pubnub.unsubscribeAll);

    }, []);

    const sendMessage = useCallback(
        async message => {

            var msgid = fname + Date.now();
            await pubnub.publish({
                message_id: msgid,
                channel: channels[0],
                message, original_timetoken: Date.now() / 1000,
                user: fname,
                status: "...",
                deleted: false,
                is_update: false
            });

            setInput({ msg: '', date: Date.now(), user: fname + ' ' + lname });

            scrollToBottom();
        },
        [pubnub, setInput]
    );

    var newmsg = false;



    return (




        <div id="chat" class="chat hide">
            <div class="chat-header">
                <div class="chat-logo">
                    <div class="chat-numbers">
                        {users.length}
                    </div>
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M15.0087 13.4607H8.64392C8.26472 13.8831 7.81112 14.3703 7.38872 14.8479C6.43112 15.9303 4.18712 16.8207 3.86072 16.9071C3.53432 16.9935 2.66312 16.9503 3.18632 16.3431C3.70952 15.7359 4.23032 14.1759 4.23032 13.4607H2.72792C1.34072 13.4607 0.203125 12.3303 0.203125 10.9455V2.88389C0.203125 1.50149 1.34072 0.371094 2.72792 0.371094H15.0087C16.3983 0.371094 17.5359 1.50149 17.5359 2.88389V10.9455C17.5359 12.3303 16.3983 13.4607 15.0087 13.4607ZM13.1367 5.57189C12.4647 5.57189 11.9175 6.11429 11.9175 6.78629C11.9175 7.45589 12.4647 7.99829 13.1367 7.99829C13.8111 7.99829 14.3559 7.45589 14.3559 6.78629C14.3559 6.11429 13.8111 5.57189 13.1367 5.57189ZM8.95592 5.70149C8.28392 5.70149 7.73672 6.24629 7.73672 6.91589C7.73672 7.58549 8.28392 8.13029 8.95592 8.13029C9.63032 8.13029 10.1751 7.58549 10.1751 6.91589C10.1751 6.24629 9.63032 5.70149 8.95592 5.70149ZM4.77512 5.83109C4.10312 5.83109 3.55592 6.37589 3.55592 7.04549C3.55592 7.71509 4.10312 8.25989 4.77512 8.25989C5.44952 8.25989 5.99432 7.71509 5.99432 7.04549C5.99432 6.37589 5.44952 5.83109 4.77512 5.83109ZM19.4511 4.57589H19.0935C19.1079 4.67429 19.1151 4.77509 19.1151 4.87829V12.5511C19.1151 13.8375 18.0567 14.8911 16.7631 14.8911H9.34712C8.86472 15.4143 8.05592 16.2903 8.05592 16.2903C8.05592 16.2903 8.31512 16.9287 9.13112 16.9287H15.6399C15.8871 17.7159 16.5495 18.3759 16.9911 18.7167C17.4711 19.0839 18.3087 19.5927 19.0047 19.6263C19.7007 19.6575 19.7775 19.4319 19.6575 19.2783C19.5375 19.1271 19.1895 18.3039 19.0479 17.9343C18.9567 17.6967 18.9663 17.2287 18.9831 16.9287H19.4511C20.7447 16.9287 21.8031 15.8751 21.8031 14.5863V6.91589C21.8031 5.62709 20.7447 4.57589 19.4511 4.57589Z"
                            fill="#F4FFED" />
                    </svg>
                    <span class="chat-name">{chatName} - {chatKey}</span>
                </div>
                <div id="chat-general-close" class="chat-close">
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M13.7846 2.373L8.20635 7.9365L13.7846 13.5C14.4871 14.2005 13.2886 15.4114 12.5783 14.7031L7.00001 9.13964L1.42174 14.7031C0.719402 15.4036 -0.494719 14.2084 0.21541 13.5L5.79368 7.9365L0.21541 2.373C-0.486931 1.67251 0.711618 0.461608 1.42174 1.16986L7.00001 6.73336L12.5783 1.16986C13.2886 0.461611 14.4871 1.67251 13.7846 2.373Z"
                            fill="#98D370" />
                    </svg>
                </div>
            </div>
            <div class="chat-shadow"></div>
            <div class="chat-container" >
                <div class="chat-date">
                    <div class="line"></div>
                    <div class="date">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.6667 1.75H10.0834V0.583336H8.91675V1.75H3.08342V0.583336H1.91675V1.75H1.33341C0.691748 1.75 0.166748 2.275 0.166748 2.91667V12.25C0.166748 12.8917 0.691748 13.4167 1.33341 13.4167H10.6667C11.3084 13.4167 11.8334 12.8917 11.8334 12.25V2.91667C11.8334 2.275 11.3084 1.75 10.6667 1.75ZM10.6667 12.25H1.33341V4.66667H10.6667V12.25Z"
                                fill="#D1D0D0" />
                        </svg>
                        <p class="date-text">{moment().format('LLLL')}</p>
                    </div>
                </div>

                {msgHistory && msgHistory.messages && msgHistory.messages.map((hmsg, messageIndex) => {

                    var i = messageIndex % 2;
                    userMe = (fname + ' ' + lname == hmsg.entry.user)

                 

                    var currentMsg = hmsg.entry.msg;
                    var reply = currentMsg;
                    var replyCount = currentMsg.indexOf(';');
                    var replies = currentMsg.split(';');
                    var hasReplay = replyCount > 0;
                    if (hasReplay) {
                        replyCount = currentMsg.split(';').length;
                        reply = replies[replyCount - 1];
                    }

                    var oldReplies = replies.slice(0, replies.length - 1)

                    return (

                        <>
                            {
                                !hasReplay ?
                               ( !userMe ? <div class="chat-message-guest" key={`message-old-${messageIndex}`} >
                                    <svg width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22 0C9.856 0 0 9.856 0 22C0 34.144 9.856 44 22 44C34.144 44 44 34.144 44 22C44 9.856 34.144 0 22 0ZM22 6.6C25.652 6.6 28.6 9.548 28.6 13.2C28.6 16.852 25.652 19.8 22 19.8C18.348 19.8 15.4 16.852 15.4 13.2C15.4 9.548 18.348 6.6 22 6.6ZM22 37.84C16.5 37.84 11.638 35.024 8.8 30.756C8.866 26.378 17.6 23.98 22 23.98C26.378 23.98 35.134 26.378 35.2 30.756C32.362 35.024 27.5 37.84 22 37.84Z"
                                            fill="#D7D7D7" />
                                    </svg>
                                    <svg class="appendix" width="8" height="7" viewBox="0 0 8 7" fill="#FBFBFB" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.07703 4.17074L2.09042 6.44132C1.42826 6.74283 0.676025 6.2588 0.676025 5.53123V1.35411C0.676025 0.626537 1.42826 0.142509 2.09042 0.444013L7.07703 2.71459C7.70168 2.99901 7.70168 3.88632 7.07703 4.17074Z"
                                            fill="#FBFBFB" />
                                    </svg>
                                    <div class="message-wrapper">
                                        <span class="name">{hmsg.entry.user} </span>
                                        <div class="message">
                                            <span >  {hmsg.entry.msg} </span>

                                        </div>
                                    </div>
                                    <div class="acts">
                                     
                                        <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => (setReplyMsg(hmsg.entry.user + '|' + hmsg.entry.msg))}>
                                            <path
                                                d="M7.89913 3.48496V1.17528C7.89913 0.667479 7.32581 0.389006 6.91629 0.683859L0.445906 5.46703C0.118292 5.71274 0.118292 6.20416 0.445906 6.44987L6.91629 11.233C7.32581 11.5279 7.89913 11.2494 7.89913 10.7416V8.39918C11.3063 8.72679 13.4358 9.98811 14.7463 12.2978C15.0411 12.8056 15.8438 12.5271 15.7619 11.9538C15.123 7.58014 13.0754 4.15657 7.89913 3.48496Z"
                                                fill="#D1D0D0" />
                                        </svg>
                                    </div>
                                </div>


                                    :


                                    <div class="chat-message-owner" key={`message-old-${messageIndex}`}>
                                        <div class="message-wrapper">
                                            <span class="name">{hmsg.entry.user} </span>
                                            <div class="message">
                                                <span>{hmsg.entry.msg}</span>

                                            </div>
                                        </div>
                                        <svg class="appendix" width="8" height="7" viewBox="0 0 8 7" fill="#FBFBFB" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.07703 4.17074L2.09042 6.44132C1.42826 6.74283 0.676025 6.2588 0.676025 5.53123V1.35411C0.676025 0.626537 1.42826 0.142509 2.09042 0.444013L7.07703 2.71459C7.70168 2.99901 7.70168 3.88632 7.07703 4.17074Z"
                                                fill="#FBFBFB" />
                                        </svg>
                                        <svg width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M22 0C9.856 0 0 9.856 0 22C0 34.144 9.856 44 22 44C34.144 44 44 34.144 44 22C44 9.856 34.144 0 22 0ZM22 6.6C25.652 6.6 28.6 9.548 28.6 13.2C28.6 16.852 25.652 19.8 22 19.8C18.348 19.8 15.4 16.852 15.4 13.2C15.4 9.548 18.348 6.6 22 6.6ZM22 37.84C16.5 37.84 11.638 35.024 8.8 30.756C8.866 26.378 17.6 23.98 22 23.98C26.378 23.98 35.134 26.378 35.2 30.756C32.362 35.024 27.5 37.84 22 37.84Z"
                                                fill="#D7D7D7" />
                                            </svg>
                                      
                                        </div> ) : userMe ?

                                        <div class="chat-message-owner" key={`message-old-${messageIndex}`}>
                                        <div class="message-wrapper">
                                            <span class="name">{reply.split('|')[0]}</span>
                                            <div class="message fix">
                                                {oldReplies && oldReplies && oldReplies.map((hmsg, messageIndex) => {

                                                    return (


                                                        <div class="message-forward">
                                                            <span class="name">{hmsg.split('|')[0]}</span>
                                                            <span class="text">{hmsg.split('|')[1]}</span>
                                                        </div>)
                                                })}
                                                <span>
                                                    {reply.split('|')[1]}
                                                </span>

                                            </div>
                                        </div>
                                        </div> : <div class="chat-message-guest" key={`message-old-${messageIndex}`}>
                                            <div class="message-wrapper">
                                                <span class="name">{reply.split('|')[0]}</span>
                                                <div class="message fix2">
                                                    {oldReplies && oldReplies && oldReplies.map((hmsg, messageIndex) => {

                                                        return (


                                                            <div class="message-forward">
                                                                <span class="name">{hmsg.split('|')[0]}</span>
                                                                <span class="text">{hmsg.split('|')[1]}</span>
                                                            </div>)
                                                    })}
                                                    <span>
                                                        {reply.split('|')[1]}
                                                    </span>

                                                </div>
                                            </div>
                                            <div class="acts">
                                             
                                                <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => (setReplyMsg(currentMsg))}>
                                                    <path
                                                        d="M7.89913 3.48496V1.17528C7.89913 0.667479 7.32581 0.389006 6.91629 0.683859L0.445906 5.46703C0.118292 5.71274 0.118292 6.20416 0.445906 6.44987L6.91629 11.233C7.32581 11.5279 7.89913 11.2494 7.89913 10.7416V8.39918C11.3063 8.72679 13.4358 9.98811 14.7463 12.2978C15.0411 12.8056 15.8438 12.5271 15.7619 11.9538C15.123 7.58014 13.0754 4.15657 7.89913 3.48496Z"
                                                        fill="#D1D0D0" />
                                                </svg>
                                            </div>
                                        </div> 

                            }
                        </>
                    );
                })}



                {

                    messages.map((message, messageIndex) => {


                        userMe = (fname + ' ' + lname == message.user)

                        var currentMsg = message.msg;
                        var reply = currentMsg;
                        var replyCount = currentMsg.indexOf(';');
                        var replies = currentMsg.split(';');
                        var hasReplay = replyCount > 0;
                        if (hasReplay) {
                            replyCount = currentMsg.split(';').length;
                            reply = replies[replyCount - 1];
                        }

                        var oldReplies = replies.slice(0, replies.length - 1)

                        return (
                            <>
                                {!hasReplay ?

                                    (!userMe ? <div class="chat-message-guest" key={`message-old-${messageIndex}`}>
                                        <svg width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M22 0C9.856 0 0 9.856 0 22C0 34.144 9.856 44 22 44C34.144 44 44 34.144 44 22C44 9.856 34.144 0 22 0ZM22 6.6C25.652 6.6 28.6 9.548 28.6 13.2C28.6 16.852 25.652 19.8 22 19.8C18.348 19.8 15.4 16.852 15.4 13.2C15.4 9.548 18.348 6.6 22 6.6ZM22 37.84C16.5 37.84 11.638 35.024 8.8 30.756C8.866 26.378 17.6 23.98 22 23.98C26.378 23.98 35.134 26.378 35.2 30.756C32.362 35.024 27.5 37.84 22 37.84Z"
                                                fill="#D7D7D7" />
                                        </svg>
                                        <svg class="appendix" width="8" height="7" viewBox="0 0 8 7" fill="#FBFBFB" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.07703 4.17074L2.09042 6.44132C1.42826 6.74283 0.676025 6.2588 0.676025 5.53123V1.35411C0.676025 0.626537 1.42826 0.142509 2.09042 0.444013L7.07703 2.71459C7.70168 2.99901 7.70168 3.88632 7.07703 4.17074Z"
                                                fill="#FBFBFB" />
                                        </svg>
                                        <div class="message-wrapper">
                                            <span class="name">{message.user} </span>
                                            <div class="message">
                                                <span >  {message.msg}</span>

                                            </div>
                                        </div>
                                        <div class="acts">
                                         
                                            <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => (setReplyMsg(message.user + '|' + message.msg))}>
                                                <path
                                                    d="M7.89913 3.48496V1.17528C7.89913 0.667479 7.32581 0.389006 6.91629 0.683859L0.445906 5.46703C0.118292 5.71274 0.118292 6.20416 0.445906 6.44987L6.91629 11.233C7.32581 11.5279 7.89913 11.2494 7.89913 10.7416V8.39918C11.3063 8.72679 13.4358 9.98811 14.7463 12.2978C15.0411 12.8056 15.8438 12.5271 15.7619 11.9538C15.123 7.58014 13.0754 4.15657 7.89913 3.48496Z"
                                                    fill="#D1D0D0" />
                                            </svg>
                                        </div>
                                    </div>


                                        :


                                        <div class="chat-message-owner" key={`message-old-${messageIndex}`}>
                                            <div class="message-wrapper">
                                                <span class="name">{message.user} </span>
                                                <div class="message">
                                                    <span>{message.msg} </span>

                                                </div>
                                            </div>
                                            <svg class="appendix" width="8" height="7" viewBox="0 0 8 7" fill="#FBFBFB" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.07703 4.17074L2.09042 6.44132C1.42826 6.74283 0.676025 6.2588 0.676025 5.53123V1.35411C0.676025 0.626537 1.42826 0.142509 2.09042 0.444013L7.07703 2.71459C7.70168 2.99901 7.70168 3.88632 7.07703 4.17074Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            <svg width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M22 0C9.856 0 0 9.856 0 22C0 34.144 9.856 44 22 44C34.144 44 44 34.144 44 22C44 9.856 34.144 0 22 0ZM22 6.6C25.652 6.6 28.6 9.548 28.6 13.2C28.6 16.852 25.652 19.8 22 19.8C18.348 19.8 15.4 16.852 15.4 13.2C15.4 9.548 18.348 6.6 22 6.6ZM22 37.84C16.5 37.84 11.638 35.024 8.8 30.756C8.866 26.378 17.6 23.98 22 23.98C26.378 23.98 35.134 26.378 35.2 30.756C32.362 35.024 27.5 37.84 22 37.84Z"
                                                    fill="#D7D7D7" />
                                            </svg>
                                        </div>) : userMe ?

                                    <div class="chat-message-owner" key={`message-old-${messageIndex}`}>
                                        <div class="message-wrapper">
                                            <span class="name">{reply.split('|')[0]}</span>
                                            <div class="message fix">
                                                {oldReplies && oldReplies && oldReplies.map((hmsg, messageIndex) => {

                                                    return (


                                                        <div class="message-forward">
                                                            <span class="name">{hmsg.split('|')[0]}</span>
                                                            <span class="text">{hmsg.split('|')[1]}</span>
                                                        </div>)
                                                })}
                                                <span>
                                                    {reply.split('|')[1]}
                                                </span>

                                            </div>
                                        </div>
                                        </div> : <div class="chat-message-guest" key={`message-old-${messageIndex}`}>
                                            <div class="message-wrapper">
                                                <span class="name">{reply.split('|')[0]}</span>
                                                <div class="message fix2">
                                                    {oldReplies && oldReplies && oldReplies.map((hmsg, messageIndex) => {

                                                        return (


                                                            <div class="message-forward">
                                                                <span class="name">{hmsg.split('|')[0]}</span>
                                                                <span class="text">{hmsg.split('|')[1]}</span>
                                                            </div>)
                                                    })}
                                                    <span>
                                                        {reply.split('|')[1]}
                                                    </span>

                                                </div>
                                            </div>
                                            <div class="acts">
                                          
                                                <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => (setReplyMsg(currentMsg))}>
                                                    <path
                                                        d="M7.89913 3.48496V1.17528C7.89913 0.667479 7.32581 0.389006 6.91629 0.683859L0.445906 5.46703C0.118292 5.71274 0.118292 6.20416 0.445906 6.44987L6.91629 11.233C7.32581 11.5279 7.89913 11.2494 7.89913 10.7416V8.39918C11.3063 8.72679 13.4358 9.98811 14.7463 12.2978C15.0411 12.8056 15.8438 12.5271 15.7619 11.9538C15.123 7.58014 13.0754 4.15657 7.89913 3.48496Z"
                                                        fill="#D1D0D0" />
                                                </svg>
                                            </div>
                                        </div> 
                                }
                            </>

                        );
                    })


                }

                <div ref={messagesRef}>   </div>

            </div>
            <div class="chat-footer" >
                {replyMsg !='' && <div class="chat-replay">
                    <span class="reply-for">Replay for:</span>
                    <span class="reply-text">{replyMsg.split('|')[0]}</span>
                </div>}
                <div class="chat-footer-wrapper">
            
                    <form>
                        <label for="messageText"><input id="messageText" type="text" placeholder="Type your message" onChange={e => setInput({ msg: e.target.value, date: Date.now(), user: fname + ' ' + lname })} value={input.msg} /></label>
                        <button class="chatButton" id="chatButton" onClick={e => {
                            e.preventDefault();
                            if (input.msg != '') {
                                if (replyMsg != '') {
                                    input.msg = replyMsg + ';' + fname + ' ' + lname + '|' + input.msg;
                                }
                                sendMessage(input);
                                setReplyMsg('');
                            }

                        }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.0001 10C19.9995 10.2015 19.9381 10.3981 19.8239 10.564C19.7097 10.7299 19.548 10.8575 19.3601 10.9301L1.36007 19.93C1.24598 19.9773 1.12355 20.0011 1.00007 20C0.808902 20.0001 0.621739 19.9453 0.460751 19.8422C0.299763 19.7391 0.171695 19.592 0.0917193 19.4184C0.0117437 19.2448 -0.0167881 19.0519 0.00950375 18.8625C0.0357956 18.6732 0.11581 18.4953 0.240066 18.3501L4.82007 11.0001H9.00007C9.26528 11.0001 9.51964 10.8947 9.70717 10.7072C9.89471 10.5196 10.0001 10.2653 10.0001 10C10.0001 9.73483 9.89471 9.48048 9.70717 9.29294C9.51964 9.10541 9.26528 9.00005 9.00007 9.00005H4.82007L0.240066 1.65005C0.0968816 1.4807 0.0140512 1.26856 0.00460306 1.047C-0.00484504 0.825433 0.0596253 0.607013 0.187874 0.426091C0.316122 0.245169 0.500872 0.11201 0.713067 0.0475585C0.925261 -0.0168932 1.15286 -0.00898083 1.36007 0.0700504L19.3601 9.07005C19.548 9.14257 19.7097 9.27015 19.8239 9.4361C19.9381 9.60204 19.9995 9.79861 20.0001 10Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>



    );
};


const ChatContent = ({ openChat, chatKey, publishKey, subscribeKey, chatName }) => {


    pubnub = new PubNub({
        publishKey: publishKey,
        subscribeKey: subscribeKey,

    });



    return (
        <PubNubProvider client={pubnub}>
            <Chat openChat={openChat} chatKey={chatKey} publishKey={publishKey} subscribeKey={subscribeKey} chatName={chatName} />
        </PubNubProvider>
    );
};


export default ChatContent;