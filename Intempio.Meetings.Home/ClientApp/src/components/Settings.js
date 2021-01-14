import React, { Component } from 'react';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: [], loading: false, sitename: '#', siteID: 'N/A', configtext: 'N/A', configitemslist: null, usermeetingexcelID: '1111', key: '',
            Title: '', Description: "",
            StartDate: "",
            EndDate: "",
            Location: '',
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
            HelpChatName: "",
            invalidKey: false,
            load: true,
            CustomChatGroups: '',
            SiteIcon: '',
            LocalDate: ''
        };
    }


    async updateSite(e) {
        e.preventDefault();
        this.updatesiteConfig();
    }


    async updatesiteConfig() {




        this.setState({ loading: true });
        let formData = new FormData();
        formData.append("formFile", this.updateConfigEntry(this.state.configitemslist));
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
            return true;
        });
        return finalresult;
    }

    async getGetSite(e) {
        e.preventDefault();


        this.getGetConfigInfo();
    }


    async getGetConfigInfo() {




        this.setState({ loading: true });
        const response = await fetch('Meeting/GetConfigInfo?validate=1&key=' + this.state.key, {
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
                    HelpChatName: item.intempioSettings.helpChatName,
                    CustomChatGroups: item.intempioSettings.customChatGroups,
                    SiteIcon: item.intempioSettings.siteIcon,
                    LocalDate: item.intempioSettings.localDate
                });
                this.getGetSiteInfo();
                this.setState({ invalidKey: false, load: false });
                return true;

            } else {

                this.setState({ invalidKey: true, load: true });

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
            if (item.value.length > 0) {
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
            "\"MeetingUserExcel\": \"/sites/####/drive/items/##ExcelSheetID##/workbook/worksheets('Sheet1')/usedRange\"," +
            "\"SharedDocumentLib\": \"/sites/####/drive/root/children?$filter=name eq '{0}'\","

        var configitems = null;



        items.forEach(item => {


            switch (item.displayName) {
                case "BreakoutRooms":
                    config = config.replace("##MatchMakingURL##", item.id);

                    configitems == null ? configitems = "MatchMakingURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields" : configitems = configitems + "|MatchMakingURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields"

                    break;

                case "EventMaster":
                    config = config.replace("##EventMasterURL##", item.id);

                    configitems == null ? configitems = "EventMasterURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields" : configitems = configitems + "|EventMasterURL#" + "/sites/" + this.state.siteID + "/lists/" + item.id + "/items?$expand=fields"
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


    updateConfigEntry(configitems) {
        var newconfig = configitems + "|"
            + "Title#" + this.state.Title + "|"
            + "Description#" + this.state.Description + "|"
            + "StartDate#" + this.state.StartDate + "|"
            + "EndDate#" + this.state.EndDate + "|"
            + "Location#" + this.state.Location + "|"
            + "Active#" + this.state.Active + "|"
            + "Menus#" + this.state.Menus + "|"
            + "Sections#" + this.state.Sections + "|"
            + "Banner#" + this.state.Banner + "|"
            + "AllEvents#" + this.state.AllEvents + "|"
            + "SQL#" + this.state.SQL + "|"
            + "Colour#" + this.state.Colour + "|"
            + "MenuFolder#" + this.state.MenuFolder + "|"
            + "UploadFolder#" + this.state.UploadFolder + "|"
            + "Video#" + this.state.Video + "|"
            + "Yammer#" + this.state.Yammer + "|"
            + "UnrecognizedLogin#" + this.state.UnrecognizedLogin + "|"
            + "Excellogin#" + this.state.Excellogin + "|"
            + "LoadingFrequency#" + this.state.LoadingFrequency + "|"
            + "SQLLogin#" + this.state.SQLLogin + "|"
            + "GeneralChatName#" + this.state.GeneralChatName + "|"
            + "HelpChatName#" + this.state.HelpChatName + "|"
            + "SiteIcon#" + this.state.SiteIcon + "|"
            + "CustomChatGroups#" + this.state.CustomChatGroups + "|"
            + "LocalDate#" + this.state.LocalDate;

        return newconfig;

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
                        {(this.state.invalidKey) && < div className="info-message">Invalid security key...   </div>}
                    </div>
                    {!this.state.load && <>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>SiteID</p>
                                <h4>{this.state.siteID} </h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Title</h4>
                                <p> <input id='comment' type="text" placeholder="Event name" class="textbox" value={this.state.Title} onChange={e => this.setState({ Title: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Description</h4>
                                <p> <input id='comment' type="text" placeholder="Description" class="textbox" value={this.state.Description} onChange={e => this.setState({ Description: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Start Date (UTC)</h4>
                                <p> <input id='comment' type="text" placeholder="MM/DD/YYYY" class="textbox" value={this.state.StartDate} onChange={e => this.setState({ StartDate: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>End Date (UTC)</h4>
                                <p> <input id='comment' type="text" placeholder="MM/DD/YYYY" class="textbox" value={this.state.EndDate} onChange={e => this.setState({ EndDate: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Active</h4>
                                <p> <input id='comment' type="text" placeholder="True/False" class="textbox" value={this.state.Active} onChange={e => this.setState({ Active: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Menus</h4>
                                <p><textarea rows="5" id='comment' type="text" placeholder="events,session>Intempio Experience 2020,video>Watch Now" class="textbox" value={this.state.Menus} onChange={e => this.setState({ Menus: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Sections</h4>
                                <p><textarea rows="5" id='comment' type="text" placeholder="home>Home,anchor>News>cat01,resources,custom>Agenda>https://intempioevetns." class="textbox" value={this.state.Sections} onChange={e => this.setState({ Sections: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>All Events</h4>
                                <p><input id='comment' type="text" placeholder="True/False" class="textbox" value={this.state.AllEvents} onChange={e => this.setState({ AllEvents: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>SQL Events</h4>
                                <p><input id='comment' type="text" placeholder="True/False" class="textbox" value={this.state.SQL} onChange={e => this.setState({ SQL: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Yammer</h4>
                                <p> <input id='comment' type="text" placeholder="True/False" class="textbox" value={this.state.Yammer} onChange={e => this.setState({ Yammer: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Excel Login</h4>
                                <p> <input id='comment' type="text" placeholder="True/False" class="textbox" value={this.state.Excellogin} onChange={e => this.setState({ Excellogin: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>SQL Login</h4>
                                <p><input id='comment' type="text" placeholder="True/False" class="textbox" value={this.state.SQLLogin} onChange={e => this.setState({ SQLLogin: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>General Chat Name</h4>
                                <p><input id='comment' type="text" placeholder="Unique name for general chat" class="textbox" value={this.state.GeneralChatName} onChange={e => this.setState({ GeneralChatName: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Help Chat Name</h4>
                                <p> <input id='comment' type="text" placeholder="Unique name for help chat" class="textbox" value={this.state.HelpChatName} onChange={e => this.setState({ HelpChatName: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Unrecognized Login</h4>
                                <p> <input id='comment' type="text" placeholder="True/False" class="textbox" value={this.state.UnrecognizedLogin} onChange={e => this.setState({ UnrecognizedLogin: e.target.value })} /></p>
                            </div>
                        </div>

                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Convert date to Local </h4>
                                <p> <input id='comment' type="text" placeholder="True/False" class="textbox" value={this.state.LocalDate} onChange={e => this.setState({ LocalDate: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Colour</h4>
                                <p> <input id='comment' type="text" placeholder="Hex value (without '#')" class="textbox" value={this.state.Colour} onChange={e => this.setState({ Colour: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Menu Folder</h4>
                                <p> <input id='comment' type="text" placeholder="Blob container url" class="textbox" value={this.state.MenuFolder} onChange={e => this.setState({ MenuFolder: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Upload Folder</h4>
                                <p> <input id='comment' type="text" placeholder="Site url" class="textbox" value={this.state.UploadFolder} onChange={e => this.setState({ UploadFolder: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Video URL</h4>
                                <p><input id='comment' type="text" placeholder="Azure media services url" class="textbox" value={this.state.Video} onChange={e => this.setState({ Video: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Banner URL</h4>
                                <p> <input id='comment' type="text" placeholder="Blob container url" class="textbox" value={this.state.Banner} onChange={e => this.setState({ Banner: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Location</h4>
                                <p> <input id='comment' type="text" placeholder="Boston" class="textbox" value={this.state.Location} onChange={e => this.setState({ Location: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Loading Frequency</h4>
                                <p> <input id='comment' type="text" placeholder="300000" class="textbox" value={this.state.LoadingFrequency} onChange={e => this.setState({ LoadingFrequency: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Site Icon</h4>
                                <p> <textarea id='comment' type="text" placeholder="0 , 1 or public icon url" class="textbox" value={this.state.SiteIcon} onChange={e => this.setState({ SiteIcon: e.target.value })} /></p>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <h4>Custom Chat Groups</h4>
                                <p> <textarea id='comment' type="text" placeholder="Group1>Group one>user1@intempio.com;user2@intempio.com,Group2>Group two>user1@intempio.com;user4@intempio.com" class="textbox" value={this.state.CustomChatGroups} onChange={e => this.setState({ CustomChatGroups: e.target.value })} /></p>
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
                    </>
                    }
                </div>

            </div>


        )
    }
}
