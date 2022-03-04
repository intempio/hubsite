import React, { Component } from 'react';

export default class ViewSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: [], loading: false, sitename: '#', EventInfoURL: 'N/A', EventMasterURL: 'N/A', PosterSessionsURL: 'N/A', MatchMakingURL: 'N/A', PresentersURL: 'N/A', UserEventsURL: 'N/A', UsersURL: 'N/A', SuperUsersURL: 'N/A', SiteID: 'N/A',
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
            key: '',
            load: true,
            CustomChatGroups: '',
            SiteIcon: '',
            LocalDate: '',
            CanLoginRequest: false,
            LoginRequestSuccessMessage: '',
            LoginRequestMessage: ''
        };
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
                    LocalDate: item.intempioSettings.localDate,

                    CanLoginRequest: item.intempioSettings.canLoginRequest,
                    LoginRequestSuccessMessage: item.intempioSettings.loginRequestSuccessMessage,
                    LoginRequestMessage: item.intempioSettings.loginRequestMessage

                });
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
                        this.setState({ EventInfoURL: item.webUrl });
                        break;

                    case "EventMasterURL":
                        this.setState({ EventMasterURL: item.webUrl });

                        break;
                    case "PosterSessionsURL":
                        this.setState({ PosterSessionsURL: item.webUrl });
                        break;
                    case "MatchMakingURL":
                        this.setState({ MatchMakingURL: item.webUrl });

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
                        this.setState({ SuperUsersURL: item.webUrl });
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



    }


    async getGetSite(e) {
        e.preventDefault();


        this.getGetConfigInfo();
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
                    <div class="settings-item " >

                        <input id='comment' type="text" placeholder="security key" class="textbox" value={this.state.key} onChange={e => this.setState({ key: e.target.value })} />
                        <button class="button" onClick={this.getGetSite.bind(this)}  >Get configurations</button>
                        {this.state.configitemslist && < button class="button" onClick={this.updateSite.bind(this)}  >Update</button>}
                        {(this.state.loading) && < div className="info-message"> Please wait...   </div>}
                        {(this.state.invalidKey) && < div className="info-message">Invalid security key...   </div>}
                    </div>

                    {!this.state.load && <><div class="settings-item">

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
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Title</p>
                                <h4>{this.state.Title}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>StartDate</p>
                                <h4>{this.state.StartDate}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>EndDate</p>
                                <h4>{this.state.EndDate}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Location</p>
                                <h4>{this.state.Location}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Active</p>
                                <h4>{this.state.Active}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Menus</p>
                                <h4>{this.state.Menus}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Sections</p>
                                <h4>{this.state.Sections}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Banner</p>
                                <h4>{this.state.Banner}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>AllEvents</p>
                                <h4>{this.state.AllEvents}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>SQL</p>
                                <h4>{this.state.SQL}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Colour</p>
                                <h4>{this.state.Colour}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Menu Folder</p>
                                <h4>{this.state.MenuFolder}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Upload Folder</p>
                                <h4>{this.state.UploadFolder}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Video</p>
                                <h4>{this.state.Video}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Yammer</p>
                                <h4>{this.state.Yammer}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Unrecognized Login</p>
                                <h4>{this.state.UnrecognizedLogin}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>EST date format</p>
                                <h4>{this.state.LocalDate}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Excel login</p>
                                <h4>{this.state.Excellogin}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Loading Frequency</p>
                                <h4>{this.state.LoadingFrequency}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Sql Login</p>
                                <h4>{this.state.sqlLogin}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>General Chat Name</p>
                                <h4>{this.state.GeneralChatName}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Help Chat Name</p>
                                <h4>{this.state.HelpChatName}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Help Chat Name</p>
                                <h4>{this.state.CustomChatGroups}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Site Icon</p>
                                <h4>{this.state.SiteIcon}</h4>
                            </div>
                        </div>

                        <div class="settings-item">

                            <div class="recent-info">
                                <p>CanLoginRequest</p>
                                <h4>{this.state.CanLoginRequest}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Login Request Success Message</p>
                                <h4>{this.state.LoginRequestSuccessMessage}</h4>
                            </div>
                        </div>
                        <div class="settings-item">

                            <div class="recent-info">
                                <p>Login Request Message</p>
                                <h4>{this.state.LoginRequestMessage}</h4>
                            </div>
                        </div>
                    </>
                    }

                </div>

            </div>


        )
    }
}
