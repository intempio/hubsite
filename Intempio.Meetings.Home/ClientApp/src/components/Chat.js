import React, { Component, useCallback, useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';


const pubnub = new PubNub({
    publishKey: 'pub-c-85a423af-7715-4ec1-b8e2-17c496843384',
    subscribeKey: 'sub-c-f9bb468c-0666-11eb-8c73-de77696b0464',

});

const channels = ['awesomeChannel'];



export const Chat = () => {
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
    const [input, setInput] = useState('');

    useEffect(() => {
        pubnub.addListener({
            message: messageEvent => {
                setMessages([...messages, messageEvent.message]);
            },
        });

        pubnub.subscribe({ channels });
    }, [messages]);

    const sendMessage = useCallback(
        async message => {
            await pubnub.publish({
                channel: channels[0],
                message,
            });

            setInput('');
        },
        [pubnub, setInput]
    );

    return (


        <div class="video">
            <h3>Chat</h3>


            <div class="video-content">
                <div class="posts">
                    <form>
                        <div class="posts-creator">

                            <input id='comment' type="text" placeholder="Write comment" value={input}
                                onChange={e => setInput(e.target.value )}/>
                            <label for="file"><input id="file" type="file" style={{ display: "none" }} /></label>
                            <button     onClick={e => {
                                e.preventDefault();
                                sendMessage(input + ' - ' + fname);
                            }} >Send Post</button>

                        </div>
                    </form>
                    <div class="posts-item">


                        {messages.map((message, messageIndex) => {
                            return (
                                

                                <p class="information" key={`message-${messageIndex}`}>
                                    {message}
                                </p>
                            );
                        })}
                 
                        

                    </div>
                </div>
            </div>
        </div>

     
    );
};


const ChatContent = () => {
    return (
        <PubNubProvider client={pubnub}>
            <Chat />
        </PubNubProvider>
    );
};


export default ChatContent;