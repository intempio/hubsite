import React, { Component } from 'react';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: [], loading: false, sitename: '#', siteID: 'N/A', configtext: 'N/A', configitemslist: null, usermeetingexcelID: '1111',key:'',
            Title: '', Description: "",
            StartDate: "",
            EndDate: "",
            Location:'',
            Active: false,
            Menus: "",
            Sections: "",
            Banner: "",
            AllEvents: false,
            SQL: false,
            Colour: "",
            MenuFolder: "",
            UploadFolder: "",
            Video: "",
            Yammer: false,
            UnrecognizedLogin: false,
            Excellogin: false,
            LoadingFrequency: 300000,
            SQLLogin: false,
            GeneralChatName: "",
            HelpChatName: ""
        };
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


    async getGetConfigInfo() {




        this.setState({ loading: true });
        const response = await fetch('Meeting/GetConfigInfo?key=' + this.state.key,  {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = resonse.value;
            this.setState({ loading: false });
            if (item) {

                this.setState({
                    Title: item.intempioSettings.title, Description: item.intempioSettings.description,
                    StartDate: item.intempioSettings.startDate,
                    Location: item.intempioSettings.location,
                    EndDate: item.intempioSettings.endDate,
                    Active: item.intempioSettings.active,
                    Menus: item.intempioSettings.menus,
                    Sections: item.intempioSettings.sections,
                    Banner: item.intempioSettings.banner,
                    AllEvents: item.intempioSettings.allEvents,
                    SQL: item.intempioSettings.sql,
                    Colour: item.intempioSettings.colour,
                    MenuFolder: item.intempioSettings.menuFolder,
                    UploadFolder: item.intempioSettings.uploadFolder,
                    Video: item.intempioSettings.video,
                    Yammer: item.intempioSettings.yammer,
                    UnrecognizedLogin: item.intempioSettings.unrecognizedLogin,
                    Excellogin: item.intempioSettings.excellogin,
                    LoadingFrequency: item.intempioSettings.loadingFrequency,
                    SQLLogin: item.intempioSettings.sqlLogin,
                    GeneralChatName: item.intempioSettings.generalChatName,
                    HelpChatName: item.intempioSettings.helpChatName });

             
                return true;

            } else {
                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
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

                this.getGetConfigInfo();
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
            "\"PosterSessionsURL\": \"sites/####/lists/##PosterSessionsURL##/items?expand=fields&$filter=fields/Category eq '{0}'\"," +
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
                    configitems == null ? configitems = "PosterSessionsURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Category eq '{0}'" : configitems = configitems + "|PosterSessionsURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Category eq '{0}'"


                    break;
                case "SuperUser":
                    config = config.replace("##SuperUsersURL##", item.id);

                    configitems == null ? configitems = "SuperUsersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Title eq '{0}'" : configitems = configitems + "|SuperUsersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Title eq '{0}'"

                    break;
                case "UserList":
                    config = config.replace("##UsersURL##", item.id);
                    configitems == null ? configitems = "UsersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Email eq '{0}'" : configitems = configitems + "|UsersURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?expand=fields&$filter=fields/Email eq '{0}'"

                    break;
               
            }

        });


        configitems = configitems + "|" + "SiteID#" + this.state.siteID + "|" + 
            "MeetingUserExcel#/sites/" + this.state.siteID + "/drive/items/" + this.state.usermeetingexcelID + "/workbook/worksheets('Sheet1')/usedRange";

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

                        <input id='comment' type="text" placeholder="security key" class="textbox" value={this.state.key} onChange={e => this.setState({ key: e.target.value })} />
                        <button class="button" onClick={this.getGetSite.bind(this)}  >Get configurations</button>
                        {this.state.configitemslist && < button class="button" onClick={this.updateSite.bind(this)}  >Update</button>}
                        {(this.state.loading) && < div className="info-message"> Please wait...   </div>}

                    </div>

                    <div class="settings-item">

                        <div class="recent-info">
                            <p>SiteID</p>
                            <h4>{this.state.siteID} </h4>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Title</h4>
                            <p>{this.state.Title} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Title} onChange={e => this.setState({ Title: e.target.value })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Description</h4>
                            <p>{this.state.Description} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Description} onChange={e => this.setState({ Description: e.target.Description })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Start Date (UTC)</h4>
                            <p>{this.state.StartDate} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.StartDate} onChange={e => this.setState({ StartDate: e.target.StartDate })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>End Date (UTC)</h4>
                            <p>{this.state.EndDate} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.EndDate} onChange={e => this.setState({ EndDate: e.target.EndDate })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Active</h4>
                            <p>{this.state.Active} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Active} onChange={e => this.setState({ Active: e.target.Active })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Active</h4>
                            <p>{this.state.Menus} <textarea rows="5" id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Menus} onChange={e => this.setState({ Menus: e.target.Menus })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Sections</h4>
                            <p>{this.state.Sections} <textarea rows="5" id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Sections} onChange={e => this.setState({ Sections: e.target.Sections })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>All Events</h4>
                            <p>{this.state.AllEvents} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.AllEvents} onChange={e => this.setState({ AllEvents: e.target.AllEvents })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>SQL Events</h4>
                            <p>{this.state.SQL} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.SQL} onChange={e => this.setState({ SQL: e.target.SQL })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Yammer</h4>
                            <p>{this.state.Yammer} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Yammer} onChange={e => this.setState({ Yammer: e.target.Yammer })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Excel Login</h4>
                            <p>{this.state.Excellogin} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Excellogin} onChange={e => this.setState({ Excellogin: e.target.Excellogin })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>SQL Login</h4>
                            <p>{this.state.SQLLogin} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.SQLLogin} onChange={e => this.setState({ Excellogin: e.target.SQLLogin })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>General Chat Name</h4>
                            <p>{this.state.GeneralChatName} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.GeneralChatName} onChange={e => this.setState({ GeneralChatName: e.target.GeneralChatName })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Help Chat Name</h4>
                            <p>{this.state.HelpChatName} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.HelpChatName} onChange={e => this.setState({ HelpChatName: e.target.HelpChatName })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Unrecognized Login</h4>
                            <p>{this.state.UnrecognizedLogin} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.UnrecognizedLogin} onChange={e => this.setState({ UnrecognizedLogin: e.target.UnrecognizedLogin })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Colour</h4>
                            <p>{this.state.Colour} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Colour} onChange={e => this.setState({ Colour: e.target.Colour })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Menu Folder</h4>
                            <p>{this.state.MenuFolder} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.MenuFolder} onChange={e => this.setState({ MenuFolder: e.target.MenuFolder })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Upload Folder</h4>
                            <p>{this.state.UploadFolder} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.UploadFolder} onChange={e => this.setState({ UploadFolder: e.target.UploadFolder })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Video URL</h4>
                            <p>{this.state.Video} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Video} onChange={e => this.setState({ Video: e.target.Video })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Banner URL</h4>
                            <p>{this.state.Banner} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Banner} onChange={e => this.setState({ Banner: e.target.Banner })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Location</h4>
                            <p>{this.state.Location} <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.Location} onChange={e => this.setState({ Location: e.target.Location })} /></p>
                        </div>
                    </div>
                    <div class="settings-item">

                        <div class="recent-info">
                            <h4>Config entry</h4>
                            <p>{this.state.configtext}</p>
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
