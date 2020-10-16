import React, { Component } from 'react';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = { lists: [], loading: true , sitename:'#' , siteID:'N/A'};
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
