import React, { Component } from 'react';
import Player from './Player';
export default class RankContent extends Component {




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

    collapsAll = () => {

        var coll = document.getElementsByClassName("collapsibleRanking");
        var rows = document.getElementsByClassName("content");



        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                for (var x = 0; x < rows.length; x++) {
                    if (rows[x].style.display === "block") {
                        rows[x].style.display = "none";
                    }
                }
                for (var x = 0; x < rows.length; x++) {
                    if (coll[x].style.display === "none") {
                        coll[x].style.display = "block";
                    }
                }
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    this.style.display = "block";
                } else {
                    content.style.display = "block";
                    this.style.display = "none";
                }


            });
        }
    }

    collapsresetAll = () => {

        var closebtns = document.getElementsByClassName("close-button");


        for (var a = 0; a < closebtns.length; a++) {
            closebtns[a].addEventListener("click", function () {


                var coll = document.getElementsByClassName("collapsibleRanking");

                for (var i = 0; i < coll.length; i++) {
                    coll[i].classList.toggle("active");
                    var content = coll[i].nextElementSibling;
                    if (content.style.display === "block") {
                        {
                            content.style.display = "none";
                            coll[i].style.display = "block";
                        }

                    }

                }
            });


        }
    }

    plusSlides = (n, i) => {
        var curr = this.state.slideIndex - n;
        if (curr == 0) { curr = 1; }
        if (curr > 3) { curr = 3; }
        this.setState({ slideIndex: curr })
        this.showSlides(curr, i);
    }
    currentSlide = (n, i) => {


        this.setState({ slideIndex: n })
        this.showSlides(n, i)
    }
    showSlides = (n, i) => {
        var slides = document.getElementsByClassName("mySlides" + i);
        var dots = document.getElementsByClassName("dot" + i);
        if (n > slides.length) { this.setState({ slideIndex: 1 }) }
        if (n < 1) { this.state.slideIndex = slides.length }
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (var i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.state.slideIndex - 1].style.display = "block";
        dots[this.state.slideIndex - 1].className += " active";
    }

    thubmnamil(l,e) {

        var control = e.target.parentElement;

        var childs = control.childNodes;

        for (var i = 0; i < childs.length; i++) {

            childs[i].classList.replace("activeC", "ac");
        }

        for (var i = 0; i < l; i++) {

            childs[i].classList.replace("ac", "activeC");
        }


    }

    componentDidMount() {

        this.getSettings();
        this.collapsresetAll();
        this.collapsAll();
        this.showSlides(this.state.slideIndex, 1);
        this.showSlides(this.state.slideIndex, 2);
        this.showSlides(this.state.slideIndex, 3);
        this.showSlides(this.state.slideIndex, 4);
        this.showSlides(this.state.slideIndex, 5);





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
                            <div class="collapsibleRanking" id="c01">
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
                            <div class="content" style={{ display: "none" }}>
                                <div class="video">
                                  
                                    <div class="video-header">
                                        <div class="video-header-first">Jill Jones </div>
                                        <div class="fa fa-times-circle close-button"> </div>
                                    </div>
                                    <div class="video-header-second">HCP Pricing Objection</div>
                                    <div class="video-content">

                                        <div class="slideshow-container">

                                            <div class="mySlides1 mySlides" id="1">
                                                <div class="numbertext">1 / 3</div>
                                                <Player
                                                    sourceVideo={{
                                                        "src": 'https://intempioms01-use2.streaming.media.azure.net/c937a863-d626-4f6f-af8e-aa4066558156/Interview Role Play - Excellent .ism/manifest', "type": "application/vnd.ms-sstr+xml"
                                                    }}
                                                />

                                            </div>



                                            <a class="prev" onClick={() => this.plusSlides(-1, 1)}>&#10094;</a>
                                            <a class="next" onClick={() => this.plusSlides(1, 1)}>&#10095;</a>
                                            <div class="bottom-dots" style={{ textAlign: "center" }} >
                                                <span class="dot1" onClick={() => this.currentSlide(1, 1)}></span>

                                            </div>
                                        </div>

                                        <div class="questions">
                                            <div class="header">
                                                <div class="header-content">
                                                    Please rate Role Play on the following:
                                                </div>
                                              

                                            </div>
                                            <div class="posts-item">

                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Ease of presentation </div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind(this,1) }></span>
                                                                <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind }></span>
                                                                <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind(this,3) }></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>
                                            <div class="posts-item">


                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Choice of reply approach</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                            <div class="posts-item">


                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Degree of probing</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="posts-item">
                                                <form class="question-inline" >
                                                    <div class="question-group">
                                                        <div class="question" >Accuracy of Information</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="footer">

                                                <input id='footer-comment' type="text" placeholder="Write comment"></input>
                                                <label for="footer-file"><input id="footer-file" type="file" style={{ display: "none" }}></input></label>
                                                <button>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div class="collapsibleRanking" id="c01">
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
                                <div class="content" style={{ display: "none" }}>
                                    <div class="video">
                                    
                                        <div class="video-header">
                                            <div class="video-header-first">Tom Smith </div>
                                            <div class="fa fa-times-circle close-button"> </div>
                                        </div>
                                        <div class="video-header-second">HCP Pricing Objection</div>
                                        <div class="video-content">

                                            <div class="slideshow-container">

                                                <div class="mySlides2 mySlides" id="2">
                                                    <div class="numbertext">1 / 3</div>
                                                    <Player
                                                        sourceVideo={{
                                                            "src": 'https://intempioms01-use2.streaming.media.azure.net/e5b2345a-7f10-45df-ba6c-1fd52c029432/Recruitment consultant role play.ism/manifest', "type": "application/vnd.ms-sstr+xml"
                                                        }}
                                                    />
                                                </div>



                                                <a class="prev" onClick={() => this.plusSlides(-1, 2)}>&#10094;</a>
                                                <a class="next" onClick={() => this.plusSlides(1, 2)}>&#10095;</a>
                                                <div class="bottom-dots" style={{ textAlign: "center" }} >
                                                    <span class="dot2" onClick={() => this.currentSlide(1, 2)}></span>

                                                </div>
                                            </div>

                                            <div class="questions">
                                                <div class="header">
                                                    <div class="header-content">
                                                        Please rate Role Play on the following:
                                                </div>
                                              

                                                </div>
                                                <div class="posts-item">

                                                    <form class="question-inline" >

                                                        <div class="question-group">
                                                            <div class="question" >Ease of presentation </div>
                                                            <div class="form-input-div">
                                                                <div class="popularity">

                                                                    <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                    <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                    <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                    <span class="fa fa-star  activeC" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                    <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </form>

                                                </div>
                                                <div class="posts-item">


                                                    <form class="question-inline" >

                                                        <div class="question-group">
                                                            <div class="question" >Choice of reply approach</div>
                                                            <div class="form-input-div">
                                                                <div class="popularity">

                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                                <div class="posts-item">


                                                    <form class="question-inline" >

                                                        <div class="question-group">
                                                            <div class="question" >Degree of probing</div>
                                                            <div class="form-input-div">
                                                                <div class="popularity">

                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                    <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="posts-item">
                                                    <form class="question-inline" >
                                                        <div class="question-group">
                                                            <div class="question" >Accuracy of Information</div>
                                                            <div class="form-input-div">
                                                                <div class="popularity">
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                    <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                    <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                    <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="footer">

                                                    <input id='footer-comment' type="text" placeholder="Write comment"></input>
                                                    <label for="footer-file"><input id="footer-file" type="file" style={{ display: "none" }}></input></label>
                                                    <button>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="collapsibleRanking">
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
                            <div class="content" style={{ display: "none" }}>
                                <div class="video">
                                    <div class="video-header">
                                        <div class="video-header-first">Jane Doe </div>
                                        <div class="fa fa-times-circle close-button"> </div>
                                    </div>
                                  
                                    <div class="video-header-second">HCP Pricing Objection</div>
                                    <div class="video-content">

                                        <div class="slideshow-container">

                                            <div class="mySlides3 mySlides" id="2">
                                                <div class="numbertext">1 / 3</div>
                                                <Player
                                                    sourceVideo={{
                                                        "src": 'https://intempioms01-use2.streaming.media.azure.net/9ec600d5-b3be-4ee8-bc2d-13da45b95d2b/Job Interview Role Play.ism/manifest', "type": "application/vnd.ms-sstr+xml"
                                                    }}
                                                />
                                            </div>



                                            <a class="prev" onClick={() => this.plusSlides(-1, 3)}>&#10094;</a>
                                            <a class="next" onClick={() => this.plusSlides(1, 3)}>&#10095;</a>
                                            <div class="bottom-dots" style={{ textAlign: "center" }} >
                                                <span class="dot3" onClick={() => this.currentSlide(1, 3)}></span>

                                            </div>
                                        </div>

                                        <div class="questions">
                                            <div class="header">
                                                <div class="header-content">
                                                    Please rate Role Play on the following:
                                                </div>
                                           

                                            </div>
                                            <div class="posts-item">

                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Ease of presentation </div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star activeC" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>
                                            <div class="posts-item">


                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Choice of reply approach</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                            <div class="posts-item">


                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Degree of probing</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="posts-item">
                                                <form class="question-inline" >
                                                    <div class="question-group">
                                                        <div class="question" >Accuracy of Information</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="footer">

                                                <input id='footer-comment' type="text" placeholder="Write comment"></input>
                                                <label for="footer-file"><input id="footer-file" type="file" style={{ display: "none" }}></input></label>
                                                <button>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="collapsibleRanking">
                                <div class="sessions-item">
                                    <div class="ranking-star" style={{/*
                                        background: "url( " + require('../assets/img/dba_720x25.png') + ")" */
                                    }}>
                                        <div class="sessions-time-ranking" >

                                            <span>
                                                <span class="fa fa-star "></span>
                                                <span class="fa fa-star "></span>
                                                <span class="fa fa-star "></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="sessions-information">
                                        <h3>Mary Todd</h3>
                                        <p>Role Play:HCP Pricing Objection
                    </p>
                                    </div>
                                    <div class="ranking-star-thumbnail" style={{
                                        background: "url( " + require('../assets/img/mary_thumbnail.png') + ")"
                                    }}>

                                    </div>

                                </div>
                            </div>
                            <div class="content" style={{ display: "none" }}>
                                <div class="video">
                                    <div class="video-header">
                                        <div class="video-header-first">Mary Todd </div>
                                        <div class="fa fa-times-circle close-button"> </div>
                                    </div>
                                
                                    <div class="video-header-second">HCP Pricing Objection</div>
                                    <div class="video-content">

                                        <div class="slideshow-container">

                                            <div class="mySlides4 mySlides" id="2">
                                                <div class="numbertext">1 / 3</div>
                                                <Player
                                                    sourceVideo={{
                                                        "src": 'https://intempioms01-use2.streaming.media.azure.net/525c0754-5740-4b84-948a-ce907e8b9203/Mock Interview Preparation_ Comm.ism/manifest', "type": "application/vnd.ms-sstr+xml"
                                                    }}
                                                />

                                            </div>



                                            <a class="prev" onClick={() => this.plusSlides(-1, 4)}>&#10094;</a>
                                            <a class="next" onClick={() => this.plusSlides(1, 4)}>&#10095;</a>
                                            <div class="bottom-dots" style={{ textAlign: "center" }} >
                                                <span class="dot4" onClick={() => this.currentSlide(1, 4)}></span>

                                            </div>
                                        </div>

                                        <div class="questions">
                                            <div class="header">
                                                <div class="header-content">
                                                    Please rate Role Play on the following:
                                                </div>
                                            

                                            </div>
                                            <div class="posts-item">

                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Ease of presentation </div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>
                                            <div class="posts-item">


                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Choice of reply approach</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                            <div class="posts-item">


                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Degree of probing</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="posts-item">
                                                <form class="question-inline" >
                                                    <div class="question-group">
                                                        <div class="question" >Accuracy of Information</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="footer">

                                                <input id='footer-comment' type="text" placeholder="Write comment"></input>
                                                <label for="footer-file"><input id="footer-file" type="file" style={{ display: "none" }}></input></label>
                                                <button>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="collapsibleRanking">
                                <div class="sessions-item">
                                    <div class="ranking-star" style={{/*
                                        background: "url( " + require('../assets/img/dba_720x25.png') + ")" */
                                    }}>
                                        <div class="sessions-time-ranking" >

                                            <span>
                                                <span class="fa fa-star "></span>
                                                <span class="fa fa-star "></span>
                                                <span class="fa fa-star "></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="sessions-information">
                                        <h3>Adam Davis</h3>
                                        <p>Role Play:HCP Pricing Objection
                    </p>
                                    </div>
                                    <div class="ranking-star-thumbnail" style={{
                                        background: "url( " + require('../assets/img/Adam_thumbnail.png') + ")"
                                    }}>

                                    </div>

                                </div>
                            </div>
                            <div class="content" style={{ display: "none" }}>
                                <div class="video">
                                    <div class="video-header">
                                        <div class="video-header-first">Adam Davis </div>
                                        <div class="fa fa-times-circle close-button"> </div>
                                    </div>
                                    <div class="video-header-second">HCP Pricing Objection</div>

                                    <div class="video-content">

                                        <div class="slideshow-container">

                                            <div class="mySlides5 mySlides" id="2">
                                                <div class="numbertext">1 / 3</div>
                                                <Player
                                                    sourceVideo={{
                                                        "src": 'https://intempioms01-use2.streaming.media.azure.net/501c2141-ddd8-45e9-918d-1fcf9cb8c9f8/Interview Simulation.ism/manifest', "type": "application/vnd.ms-sstr+xml"
                                                    }}
                                                />
                                            </div>



                                            <a class="prev" onClick={() => this.plusSlides(-1, 5)}>&#10094;</a>
                                            <a class="next" onClick={() => this.plusSlides(1, 5)}>&#10095;</a>
                                            <div class="bottom-dots" style={{ textAlign: "center" }} >
                                                <span class="dot5" onClick={() => this.currentSlide(1, 5)}></span>

                                            </div>
                                        </div>

                                        <div class="questions">
                                            <div class="header">
                                                <div class="header-content">
                                                    Please rate Role Play on the following:
                                                </div>


                                            </div>
                                            <div class="posts-item">

                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Ease of presentation </div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>
                                            <div class="posts-item">


                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Choice of reply approach</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                            <div class="posts-item">


                                                <form class="question-inline" >

                                                    <div class="question-group">
                                                        <div class="question" >Degree of probing</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="posts-item">
                                                <form class="question-inline" >
                                                    <div class="question-group">
                                                        <div class="question" >Accuracy of Information</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 1)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 2)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 3)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 4)}></span>
                                                                <span class="fa fa-star ac" onClick={this.thubmnamil.bind(this, 5)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="footer">

                                                <input id='footer-comment' type="text" placeholder="Write comment"></input>
                                                <label for="footer-file"><input id="footer-file" type="file" style={{ display: "none" }}></input></label>
                                                <button>Save</button>
                                            </div>
                                        </div>
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

