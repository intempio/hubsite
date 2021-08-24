import React, { Component } from 'react';
import Player from './Player';
export default class Leaderboard extends Component {




    constructor(props) {
        super(props);
        this.state = { msgs: [], loading: true, msg: '', name: '', inReview: false, file: null, yammer: null, videourl: '#', slideIndex: 1 };
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






    componentDidMount() {

        this.getSettings();
    }

    render() {

        return (
            <>
                <div class="skeleton-sessions" style={{ display: this.state.loading ? "" : "none" }}>
                    <div class="skelleton-header">
                        <h3 class="skelleton-loading">Upcoming Events</h3>
                        <div class="skelleton-loading skeleton-sessions-selector">
                            <div class="selector">
                            </div>

                        </div>
                    </div>
                    <div class="skeleton-sessions-item">
                        <div class="skelleton-loading skeleton-sessions-time">
                            <div class="skelleton-loading skel-con"></div>
                            <span class=" skelleton-loading time">2:10 AM -2:35 AM</span>
                        </div>
                        <div class="skelleton-loading skel-wrapper">
                            <div class="skeleton-sessions-information">
                                <h3>General Sessesion</h3>
                                <span>Neque porro quisquam est, qui quaerat voluptatem.</span>
                                <span>Neque porro quisquam est, qui</span>
                            </div>
                            <button>Join Session</button>
                        </div>
                    </div>
                    <div class="skeleton-sessions-item">
                        <div class="skelleton-loading skeleton-sessions-time">
                            <div class="skelleton-loading skel-con"></div>
                            <span class=" skelleton-loading time">2:10 AM -2:35 AM</span>
                        </div>
                        <div class="skelleton-loading skel-wrapper">
                            <div class="skeleton-sessions-information">
                                <h3>General Sessesion</h3>
                                <span>Neque porro quisquam est, qui quaerat voluptatem.</span>
                                <span>Neque porro quisquam est, qui</span>
                            </div>
                            <button>Join Session</button>
                        </div>
                    </div>
                    <div class="skeleton-sessions-item">
                        <div class="skelleton-loading skeleton-sessions-time">
                            <div class="skelleton-loading skel-con"></div>
                            <span class=" skelleton-loading time">2:10 AM -2:35 AM</span>
                        </div>
                        <div class="skelleton-loading skel-wrapper">
                            <div class="skeleton-sessions-information">
                                <h3>General Sessesion</h3>
                                <span>Neque porro quisquam est, qui quaerat voluptatem.</span>
                                <span>Neque porro quisquam est, qui</span>
                            </div>
                            <button>Join Session</button>
                        </div>
                    </div>
                    <div class="skeleton-sessions-item">
                        <div class="skelleton-loading skeleton-sessions-time">
                            <div class="skelleton-loading skel-con"></div>
                            <span class=" skelleton-loading time">2:10 AM -2:35 AM</span>
                        </div>
                        <div class="skelleton-loading skel-wrapper">
                            <div class="skeleton-sessions-information">
                                <h3>General Sessesion</h3>
                                <span>Neque porro quisquam est, qui quaerat voluptatem.</span>
                                <span>Neque porro quisquam est, qui</span>
                            </div>
                            <button>Join Session</button>
                        </div>
                    </div>
                    <div class="skeleton-sessions-item">
                        <div class="skelleton-loading skeleton-sessions-time">
                            <div class="skelleton-loading skel-con"></div>
                            <span class=" skelleton-loading time">2:10 AM -2:35 AM</span>
                        </div>
                        <div class="skelleton-loading skel-wrapper">
                            <div class="skeleton-sessions-information">
                                <h3>General Sessesion</h3>
                                <span>Neque porro quisquam est, qui quaerat voluptatem.</span>
                                <span>Neque porro quisquam est, qui</span>
                            </div>
                            <button>Join Session</button>
                        </div>
                    </div>
                </div>


                <div id={this.props.category} class="sessions" style={{ display: !this.state.loading ? "" : "none" }}>
                    <div class="sessions-header">
                        <h3>{this.props.cname}</h3>

                    </div>
                    <div class="sessions-wrapper">
                        <div>
                            <div>
                                <div class="collapsible" id="c01">
                                    <div class="sessions-item">
                                        <div class="ranking-star">
                                            <div class="sessions-time-ranking">
                                                <span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star"></span>

                                                </span>
                                                <div class="ranling-count"> 98</div>
                                            </div>
                                        </div>
                                        <div class="sessions-information">
                                            <h3>Tom Smith</h3>
                                            <p>Role Play:HCP Pricing Objection </p>
                                        </div>

                                        <div class="ranking-star-thumbnail" style={{
                                            background: "url( " + require('../assets/img/tom_thumbnail.png') + ")"
                                        }}>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div class="collapsible" id="c01">
                                <div class="sessions-item">
                                    <div class="ranking-star">
                                        <div class="sessions-time-ranking">
                                            <span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>

                                            </span>
                                            <div class="ranling-count"> 112</div>
                                        </div>
                                    </div>
                                    <div class="sessions-information">
                                        <h3>Jill Jones</h3>
                                        <p>Role Play:HCP Pricing Objection </p>
                                    </div>

                                    <div class="ranking-star-thumbnail" style={{
                                        background: "url( " + require('../assets/img/jill_thumbnail.png') + ")"
                                    }}>

                                    </div>

                                </div>
                            </div>
                
                        </div>

                   

                        <div>
                            <div class="collapsible">
                                <div class="sessions-item">
                                    <div class="ranking-star" style={{/*
                                        background: "url( " + require('../assets/img/dba_720x25.png') + ")" */
                                    }}>
                                        <div class="sessions-time-ranking" >

                                            <span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star "></span>
                                                <span class="fa fa-star "></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </span>
                                            <div class="ranling-count"> 43</div>
                                        </div>
                                    </div>
                                    <div class="sessions-information">
                                        <h3>Jane Doe</h3>
                                        <p>Role Play:HCP Pricing Objection
                    </p>
                                    </div>
                                    <div class="ranking-star-thumbnail" style={{
                                        background: "url( " + require('../assets/img/Jane_thumbnail.png') + ")"
                                    }}>

                                    </div>

                                </div>
                            </div>
                       
                        </div>
                       
                    </div>
                </div>
            </>
        )
    }
}

