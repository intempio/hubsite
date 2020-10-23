import React, { Component } from 'react';

export default class ViewSettings extends Component {

    constructor(props) {
        super(props);
        this.state = { lists: [], loading: true, sitename: '#', EventInfoURL: 'N/A', EventMasterURL: 'N/A', PosterSessionsURL: 'N/A', MatchMakingURL: 'N/A', PresentersURL: 'N/A', UserEventsURL: 'N/A', UsersURL: 'N/A', SuperUsersURL: 'N/A', SiteID:'N/A'};
    }



    async getGetListInfo(configkey) {


        this.setState({ loading: true });
        const response = await fetch('Meeting/GetInfo?key=' + configkey, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
    this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });

            var url = 'N/A';
            var key = configkey;
            if (item) {

                switch (key) {
                    case "EventInfoURL":
                        this.setState({ EventInfoURL: item.webUrl});
                        break;

                    case "EventMasterURL":
                        this.setState({ EventMasterURL: item.webUrl });

                        break;
                    case "PosterSessionsURL":
                        this.setState({ PosterSessionsURL: item.webUrl });
                        break;
                    case "MatchMakingURL":
                        this.setState({ MatchMakingURL: item.webUrl});

                        break;
                    case "PresentersURL":
                        this.setState({ PresentersURL: item.webUrl });

                        break;
                    case "UserEventsURL":
                        this.setState({ UserEventsURL: item.webUrl });

                        break;
                    case "UsersURL":
                        this.setState({ UsersURL: item.webUrl });

                        break;
                    case "SuperUsersURL":
                        this.setState({ SuperUsersURL: item.webUrl});
                        break;
                    case "SiteID":
                        this.setState({ SiteID: item.webUrl });

                        break;
                }
                return true;

            } else {
                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }


    
    componentDidMount() {

        this.getGetListInfo("EventInfoURL");
        this.getGetListInfo("EventMasterURL");
        this.getGetListInfo("PosterSessionsURL");
        this.getGetListInfo("MatchMakingURL");
        this.getGetListInfo("PresentersURL");
        this.getGetListInfo("UsersURL");
        this.getGetListInfo("SuperUsersURL");
        this.getGetListInfo("SiteID");


    }
    render() {

        return (

            <div class="recent">
                <h3>Current Site Settings</h3>
                <div class="recent-container settings" >

         
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>SiteID</p>
                            <h4>{this.state.SiteID}</h4>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>EventInfoURL</p>
                            <h4>{this.state.EventInfoURL}</h4>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>EventMasterURL</p>
                            <h4>{this.state.EventMasterURL}</h4>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>PosterSessionsURL</p>
                            <h4>{this.state.PosterSessionsURL}</h4>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>MatchMakingURL</p>
                            <h4>{this.state.MatchMakingURL}</h4>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>PresentersURL</p>
                            <h4>{this.state.PresentersURL}</h4>
                        </div>
                    </div>
                 
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>UsersURL</p>
                            <h4>{this.state.UsersURL}</h4>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>SuperUsersURL</p>
                            <h4>{this.state.SuperUsersURL}</h4>
                        </div>
                    </div>
                    {(this.state.loading) && < div className="info-message"> Please wait...   </div>}
                    
                </div>
             
            </div>


        )
    }
}
