import React, { Component } from 'react';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = { lists: [], loading: false , sitename:'#' , siteID:'N/A', configtext:'N/A' ,configitemslist:null,usermeetingexcelID:'1111'};
    }


    async updateSite(e) {
        e.preventDefault();
        this.updatesiteConfig();
    }


    async updatesiteConfig() {




        this.setState({ loading: true });
        let formData = new FormData();
        formData.append("formFile", this.state.configitemslist);
        const response = await fetch('Meeting/UpdateSiteConfig', {
            method: "POST",
            body: formData

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
    async getGetShareddocumentItem() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetSharedDocumentItem?filename=MeetingUsers.xlsx&siteID=' + this.state.siteID, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (item.value.length>0) {
                this.setState({ usermeetingexcelID: item.value[0].id });

                this.getGetListInfo();
                return true;

            } else {

                this.setState({ usermeetingexcelID: "1111" });

                this.getGetListInfo();
                return true;
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

                this.getGetShareddocumentItem();
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
            "\"PresentersURL\": \"/sites/####/lists/##PresentersURL##/items?$expand=fields&$top=500\"," +
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
            "\"SiteID\": \"####\"," +
             "\"MeetingUserExcel\": \"/sites/####/drive/items/##ExcelSheetID##/workbook/worksheets('Sheet1')/usedRange\","+
            "\"SharedDocumentLib\": \"/sites/####/drive/root/children?$filter=name eq '{0}'\","

        var configitems = null;
 


        items.forEach(item => {


            switch (item.displayName) {
                case "BreakoutRooms":
                    config = config.replace("##MatchMakingURL##", item.id);

                    configitems == null ? configitems = "MatchMakingURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields" : configitems = configitems + "|MatchMakingURL#" + "/sites/" + this.state.siteID+"/lists/" + item.id + "/items?$expand=fields"
                 
                    break;

                case "EventMaster":
                    config = config.replace("##EventMasterURL##", item.id);

                    configitems == null ? configitems = "EventMasterURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields" : configitems = configitems + "|EventMasterURL#" + "/sites/" + this.state.siteID +"/lists/" + item.id + "/items?$expand=fields"
                    break;
                case "EventInfo":
                    config = config.replace("##EventInfoURL##", item.id);
                    configitems == null ? configitems = "EventInfoURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields" : configitems = configitems + "|EventInfoURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields"

                    break;
                case "MeetingUserList":
                    config = config.replace("##UserEventsURL##", item.id);
                    configitems == null ? configitems = "MeetingUserList#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Email eq '{0}'" : configitems = configitems + "|UserEventsURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Email eq '{0}'"


                    break;
                case "Panels":
                    config = config.replace("##PresentersURL##", item.id);

                    configitems == null ? configitems = "PresentersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields&$top=500" : configitems = configitems + "|PresentersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields&$top=500"

                    break;
                case "Poster sessions":
                    config = config.replace("##PosterSessionsURL##", item.id);
                    configitems == null ? configitems = "PosterSessionsURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields" : configitems = configitems + "|PosterSessionsURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields"


                    break;
                case "SuperUser":
                    config = config.replace("##SuperUsersURL##", item.id);

                    configitems == null ? configitems = "SuperUsersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Email eq '{0}'" : configitems = configitems + "|SuperUsersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Email eq '{0}'"

                    break;
                case "UserList":
                    config = config.replace("##UsersURL##", item.id);
                    configitems == null ? configitems = "UsersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Email eq '{0}'" : configitems = configitems + "|UsersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Email eq '{0}'"

                    break;
               
            }

        });


        configitems = configitems + "|" + "SiteID#" + this.state.siteID + "|" + 
            "\"MeetingUserExcel\": \"/sites/" + this.state.siteID + "/drive/items/" + this.state.usermeetingexcelID + "workbook/worksheets('Sheet1')/usedRange,";

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

        config = config.replace("####", id);
        config = config.replace("####", id);
        config = config.replace("##ExcelSheetID##", this.state.usermeetingexcelID);
        this.setState({ configtext: config });
        this.setState({ configitemslist: configitems });

      
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
                        {this.state.configitemslist && < button class="button" onClick={this.updateSite.bind(this)}  >Update</button>}
                        {(this.state.loading) && < div className="info-message"> Please wait...   </div>}

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
                    <div class="settings-item">

                        <div class="recent-info">
                            <p>MeetingUser.xlsx ID</p>
                            <h4>{this.state.usermeetingexcelID}</h4>
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
