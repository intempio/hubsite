import React, { Component } from 'react';

import Events from './events';
import Session from './Sessions';
import Video from './video';
import Tables from './tables';
import Presenters from './presenters';
import Funstuff from './Funstuff';
import Stream from './Stream';
import MostRecent from './MostRecent';
import MatchMaking from './MatchMaking';
import Poster from './Poster';

import SessionsSQL from './SessionsSQL';
import ChatContent from './Chat'




export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { sections: [], allEvents: false, loading: false, isSQL: false };

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
            if (item && item.value[0].fields.Sections) {

                this.setState({ sections: item.value[0].fields.Sections.split(","), allEvents: item.value[0].fields.AllEvents, isSQL: item.value[0].fields.sql});
                return true;

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
        this.getSettings();
    }


    render() {



        return (
            <>
                {this.state.loading && <div class="sessions-item">loading...</div>}
                {
                    this.state.sections && this.state.sections.map((item, i) => {

                        var itemvalue = item;
                        var name = item;
                        if (itemvalue.indexOf('>')>0) {
                            name = itemvalue.split('>')[1]
                            itemvalue= itemvalue.split('>')[0]
                        }

                        itemvalue = itemvalue.toLowerCase();

                        switch (itemvalue) {

                            case "events":
                                return <Events buttonStatus="false"/>

                            case "session":

                                if (this.state.isSQL === true) {
                                    return <SessionsSQL allEvents={this.state.allEvents} cname={name} />
                                }
                                else {
                                    return <Session allEvents={this.state.allEvents} cname={name} />
                                }
                            case "video":
                                return <Video cname={name} />
                            case "mostrecent":
                                return <MostRecent cname={name} />
                            case "poster":
                                return <Poster cname={name} />
                            case "chat":
                                return <ChatContent cname={name} />
                            case "presenters":
                                return <Presenters cname={Presenters} />
                                

                        }
                       
                    })
               
                }

                {(!this.state.sections || (this.state.sections && this.state.sections.length == 0)) && !this.state.loading && <Events buttonStatus="false" />}
                {(!this.state.sections || (this.state.sections && this.state.sections.length == 0)) && !this.state.loading && <SessionsSQL allEvents={false} />}
                {(!this.state.sections || (this.state.sections && this.state.sections.length == 0)) && !this.state.loading && <Video/> }
                {(!this.state.sections || (this.state.sections && this.state.sections.length == 0)) && !this.state.loading && <MostRecent />}
                {(!this.state.sections || (this.state.sections && this.state.sections.length == 0)) && !this.state.loading && <Poster />}
                {(!this.state.sections || (this.state.sections && this.state.sections.length == 0)) && !this.state.loading && <ChatContent />}
                {(!this.state.sections || (this.state.sections && this.state.sections.length == 0)) && !this.state.loading && <Presenters />}

               
               
 </>
           
        );
    }
}
