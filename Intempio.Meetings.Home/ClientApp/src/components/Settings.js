import React, { Component } from 'react';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = { lists: [], loading: true , sitename:'#' , siteID:'N/A', configtext:'N/A'};
    }

    async getGetSite(e) {
        e.preventDefault();
        this.getGetSiteInfo();
    }

    async getGetListInfo() {




        this.setState({ loading: true });
        const response = await fetch('Meeting/GetListInfo?sitename=' + this.state.siteID, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
    this.setState({ loading: false });
            var items = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (items) {
                this.setState({ lists: items.value });

                this.buildconfig(items.value);
                return true;

            } else {
                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }

    async getGetSiteInfo() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetSiteInfo?sitename=' + this.state.sitename, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
          this.setState({ loading: false });
            var items = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (items) {
                this.setState({ siteID: items.id });

              this.getGetListInfo();
                return true;

            } else {
                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }
    onchangeSiteID(e) {

        this.setState({ sitename: e.target.value });

    }
    componentDidMount() {

  
    }




    buildconfig(items) {



        //EventInfoURL: /sites/{siteID}/lists/{EventInfo list ID}/items?$expand=fields
        var config = "\"EventInfoURL\": \"/sites/####/lists/##EventInfoURL##/items?$expand=fields\"," +
            //EventMasterURL: /sites/{siteID}/lists/{EventInfo list ID}/items?$expand=fields
            "\"EventMasterURL\": \"sites/####/lists/##EventMasterURL##/items?$expand=fields\"," +
            //PosterSessionsURL: /sites/{siteID}/lists/{PosterSessions list ID}/items?$expand=fields
            "\"PosterSessionsURL\": \"sites/####/lists/##PosterSessionsURL##/items?$expand=fields\"," +
            //"MatchMakingURL": "sites/{siteID}/lists/{BreakoutRooms list id}/items?$expand=fields",
            "\"MatchMakingURL\": \"/sites/####/lists/##MatchMakingURL##/items?$expand=fields\"," +
            //"PresentersURL": "sites/{siteID}/lists/{Panels list id}/items?$expand=fields&$top={number of presenters}",
            "\"PresentersURL\": \"/sites/####/lists/##PresentersURL##/items?$expand=fields&$top=3\"," +
            //"UserEventsURL": "/sites/{siteID}/lists/{MeetingUserList list id}/items?expand=fields&$filter=fields/Email eq '{0}'",
            //Make sure you have created the index over email on the UserEvents list
            "\"UserEventsURL\": \"/sites/####/lists/##UserEventsURL##/items?expand=fields&$filter=fields/Email eq '{0}'\"," +
            //"UsersURL": "/sites/{site id}/lists/{UserList Id }/items?expand=fields&$filter=fields/Email eq '{0}'",
            //Make sure you have created the index over email on the UserList 
            "\"UsersURL\": \"/sites/####/lists/##UsersURL##/items?expand=fields&$filter=fields/Email eq '{0}'\"," +
            //"SuperUsersURL": "/sites/{site id}/lists/{SuperUser list id}/items?expand=fields&$filter=fields/Title eq '{0}'",
            //Make sure you have created the index over title on the SuperUser list 
            "\"SuperUsersURL\": \"/sites/####/lists/##SuperUsersURL##/items?expand=fields&$filter=fields/Title eq '{0}'\"," +
            //  "SiteID": "{SiteID}",
            "\"SiteID\": \"####";


 


        items.forEach(item => {


            switch (item.displayName) {
                case "BreakoutRooms":
                    config = config.replace("##MatchMakingURL##", item.id);
                    break;

                case "EventMaster":
                    config = config.replace("##EventMasterURL##", item.id);


                    break;
                case "EventInfo":
                    config = config.replace("##EventInfoURL##", item.id);

                    break;
                case "MeetingUserList":
                    config = config.replace("##UserEventsURL##", item.id);


                    break;
                case "Panels":
                    config = config.replace("##PresentersURL##", item.id);


                    break;
                case "Poster sessions":
                    config = config.replace("##PosterSessionsURL##", item.id);


                    break;
                case "SuperUser":
                    config = config.replace("##SuperUsersURL##", item.id);


                    break;
                case "UserList":
                    config = config.replace("##UsersURL##", item.id);

                    break;
               
            }

        });

        var id = this.state.siteID;
        config = config.replace("####", id);
        config = config.replace("####", id);

        config = config.replace("####", id);
        config = config.replace("####", id);
        config = config.replace("####", id);
        config = config.replace("####", id);

        config = config.replace("####", id);

        config = config.replace("####", id);
        config = config.replace("####", id);


        this.setState({ configtext: config });
      
    }




    render() {

        return (

            <div class="recent">
                <h3>Settings</h3>
                <div class="recent-container settings" >

         
                    <div class="settings-item " >

                        <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.sitename} onChange={this.onchangeSiteID.bind(this)} 
                        />
                        <button class="button" onClick={this.getGetSite.bind(this)}  >Get configurations</button>

                    </div>

                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Config entry</h4>
                            <p>{this.state.configtext}</p>
                        </div>
                    </div>

                    <div class="settings-item">

                        <div class="recent-info">
                            <p>SiteID</p>
                            <h4>{this.state.siteID}</h4>
                        </div>
                    </div>

                    {this, this.state.lists.map(item => {

                        return <div class="settings-item">
                            <div class="recent-info">
                                <p>{item.displayName}</p>
                                <h4>{item.id}</h4>
                            </div>
                        </div>
                    })
                        
                    }
                    
                </div>
             
            </div>


        )
    }
}
