﻿import React, { Component } from 'react';

export default class OpenInIframe extends Component {


    constructor(props) {
        super(props);
        this.state = { videourl: '#', name: '', loading: true };
    }



    componentDidMount() {

        var url = new URL(window.location);
        var vurl = url.searchParams.get("vurl");
        var vname = url.searchParams.get("name");

        this.setState({ url: this.props.url, name: this.props.cname, loading: false });

    }

    render() {

        return (

            <>
                <div class="skeleton-video" style={{ display: this.state.loading ? "" : "none" }}>
                    <h3 class="skelleton-loading">Watch Again</h3>
                    <div class="skeleton-video-content">
                        <div class="skelleton-loading  skeleton-video-last-wrapper">
                            <div class="video-last"></div>
                        </div>
                        <div class="posts">
                            <form>
                                <div class="skelleton-loading  posts-creator">
                                    <div class="skel-img"></div>
                                    <div class="skel-input"></div>
                                    <div class="skel-button"></div>
                                </div>
                            </form>
                            <div class="skelleton-loading  posts-item">
                                <div class="header">
                                    <div class="header-content">
                                        <div class="header-avatar">
                                            <div class="skel-con"></div>
                                        </div>
                                        <div class="header-info">
                                            <div class="user-name">
                                                John Doe
                    </div>
                                            <div class="date">
                                                <span>Nov 19th, 2019, at 14:00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header-more">
                                    </div>
                                </div>
                                <p class="information">
                                    Here is one of previously written comments.
              </p>
                                <div class="posts-item-image">
                                    <div class="skel-img"></div>
                                </div>
                                <div class="popularity">
                                    <div class="popularity-item">
                                    </div>
                                    <div class="vertical-line"></div>
                                    <div class="popularity-item">
                                    </div>
                                </div>
                                <form>
                                    <div class="footer">
                                        <div class="skel-img"></div>
                                        <div class="skel-input"></div>
                                        <div class="skel-button"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="video" id={this.props.category} >
                    <h3>{this.state.name}</h3>
                    <div class="video-content">
                        {this.state.url == '#' ? < img src={require("../assets/img/video-icons/video-icon.jpg")} alt="video-last" class="video-last" /> :
                            this.state.url != '#' && <div class="video-content">

                                <iframe src={this.state.url} class="custom-web" ></iframe>

                            </div>


                        }

                    </div>


                </div>
            </>
        )
    }
}
