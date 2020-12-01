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
        this.state = { sections: [], allEvents: false, loading: false, isSQL: false, loadfrequency:0 };

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

                this.setState({ sections: item.value[0].fields.Sections.split(","), allEvents: item.value[0].fields.AllEvents, isSQL: item.value[0].fields.sql, loadfrequency: item.value[0].fields.LoadingFrequency});
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

                this.setState({ sections: item.intempioSettings.sections.split(","), loading: false, allEvents: (item.intempioSettings.allEvents.toLowerCase() === 'true'), isSQL: (item.intempioSettings.sql.toLowerCase() === 'true'), loadfrequency: item.intempioSettings.loadingFrequency });
          

            } else {

                this.setState({ invalidKey: true, load: true });

                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }

    componentDidMount() {
        this.getSettingsv2();

        //window.location.hash = window.decodeURIComponent(window.location.hash);
        //const scrollToAnchor = () => {
        //    const hashParts = window.location.hash.split('#');
        //    if (hashParts.length > 2) {
        //        const hash = hashParts.slice(-1)[0];
        //        document.querySelector(`#${hash}`).scrollIntoView();
        //    }
        //};
        //scrollToAnchor();
        //window.onhashchange = scrollToAnchor;

      
    }


    render() {



        return (
            <>
                {this.state.loading && <div class="sessions-item">loading...</div>}
                {
                    this.state.sections && this.state.sections.map((item, i) => {

                        var itemvalue = item;
                        var name = item;
                        var anchor = 'default';
                     
                        if (itemvalue.indexOf('>') > 0) {
                            if (itemvalue.split('>').length === 3) {
                                anchor = itemvalue.split('>')[2]
                            }
                            name = itemvalue.split('>')[1]
                            itemvalue= itemvalue.split('>')[0]
                        }
                        
                        itemvalue = itemvalue.toLowerCase();

                        switch (itemvalue) {

                            case "events":
                                return <Events buttonStatus="false"/>

                            case "session":

                                if (this.state.isSQL === true) {
                                    return <SessionsSQL allEvents={this.state.allEvents} cname={name} refreshRate={this.state.loadfrequency} />
                                }
                                else {
                                    return <Session allEvents={this.state.allEvents} cname={name} refreshRate={this.state.loadfrequency} />
                                }
                            case "video":
                                return <Video cname={name} />
                            case "mostrecent":
                                return <MostRecent cname={name} />
                            case "poster":
                                return <Poster cname={name} category={anchor }/>
                            case "chat":
                                return <ChatContent cname={name} />
                            case "presenters":
                                return <Presenters cname={name} category={anchor}/>
                                

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
