import React, { Component } from 'react';
import ChatContent from './Chat'
import Player from './Player';
export default class Video extends Component {




    constructor(props) {
        super(props);
        this.state = { msgs: [], loading: true, msg: '', name: '', inReview: false, file: null, yammer: null, videourl: '#' };
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
            if (item && item.value[0].fields.Video) {

                this.setState({ videourl: item.value[0].fields.Video.Url, yammer: item.value[0].fields.Yammer });
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
                this.setState({ videourl: item.intempioSettings.video, yammer: (item.intempioSettings.yammer.toLowerCase() === 'true') });
      

            } else {

                this.setState({ invalidKey: true, load: true });

                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }

    async getYammerFeed() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetAllYammer', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });


        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (item && item.messages) {
                this.setState({ msgs: item.messages });
                return true;

            } else {
                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }

    loadmsgFromYammer = () => {

        var interval = 10000;

        setInterval(() => {

            // this.getYammerFeed();
            this.setState({ inReview: false });

        }, interval);
    }
    componentDidMount() {

        this.getSettings();
        this.loadmsgFromYammer();

    }



    async PostYammerFeed() {
        this.setState({ loading: true });
        let token = localStorage.getItem('userToken')
        let name = '';
        token = JSON.parse(token);
        if (token) {
            name = token.firstName;
        }
        if (!name) {
            name = token.inputFirstName;
        }

        let formData = new FormData();
        formData.append("formFile", this.state.file);
        const response = await fetch('Meeting/PostYammer?msg=' + this.state.msg + ' - ' + name, {
            method: "POST",
            body: formData

        });


        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);

            this.setState({ loading: false, inReview: true, msg: '' });

            return true;

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }

    async PostYammer(e) {
        e.preventDefault();
        this.PostYammerFeed();
    }

    async upload(e) {
        //e.preventDefault();
        //this.getYammerFeed();
        e.preventDefault();
        this.PostYammerFeed();
    }

    async uploadFile(e) {
        //e.preventDefault();
        //this.getYammerFeed();
        e.preventDefault();

        this.setState({ file: e.target.files[0] });

    }

    onchangeMsg(e) {

        this.setState({ msg: e.target.value });

    }
    render() {

        return (

            <div class="video">
                <h3>{this.props.cname}</h3>
                <div class="video-content">
                    {this.state.videourl == '#' ? < img src={require("../assets/img/video-icons/video-icon.jpg")} alt="video-last" class="video-last" /> :


                        this.state.videourl != '#' && <div class="video-content">
                        
                            <Player
                                sourceVideo={{ "src": this.state.videourl, "type": "application/vnd.ms-sstr+xml" }}
                            />

                            

                        </div>

                    }
                    {this.state.yammer === true && <div class="posts">
                        <form>
                            <div class="posts-creator">


                                <input id='comment' type="text" placeholder="Enter message" value={this.state.msg} onChange={this.onchangeMsg.bind(this)} />
                                <label for="file"><input id="file" type="file" style={{ display: "none" }} onChange={this.uploadFile.bind(this)} /></label>
                                <button onClick={this.PostYammer.bind(this)} >Post</button>

                            </div>
                            {this.state.inReview && <div class="informationmsg"> The posted message is under review..</div>}
                        </form>
                        <div class="posts-item">
                            {

                                this.state.msgs && this.state.msgs.slice(0).reverse().map((item, i) => {

                                    if (item.liked_by.count > 0) {
                                        return <p class="information">
                                            {item.body.plain}
                                        </p>
                                    }
                                    return null;
                                })
                            }


                        </div>
                    </div>}

                    {this.state.yammer == null && <ChatContent/>}
                </div>
            </div>



        )
    }
}

