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

        var coll = document.getElementsByClassName("collapsible");


        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
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


                var coll = document.getElementsByClassName("collapsible");

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
    plusSlides = (n) => {
        var curr = this.state.slideIndex - n;
        if (curr == 0) { curr = 1; }
        if (curr > 3) { curr = 3; }
        this.setState({ slideIndex: curr })
        this.showSlides(curr);
    }
    currentSlide = (n) => {


        this.setState({ slideIndex: n })
        this.showSlides(n)
    }
    showSlides = (n) => {
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
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



    componentDidMount() {

        this.getSettings();
        this.collapsresetAll();
        this.collapsAll();
        this.showSlides(this.state.slideIndex);

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
                                        </div>
                                    </div>
                                    <div class="sessions-information">
                                        <h3>Jill Jones</h3>
                                        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                                        sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                        voluptatem.
                    </p>
                                    </div>

                                    <div class="ranking-star-thumbnail">

                                    </div>

                                </div>
                            </div>
                            <div class="content" style={{ display: "none" }}>
                                <div class="video">
                                    <div class="video-header">Jill Jones</div>
                                    <div class="video-content">

                                        <div class="slideshow-container">

                                            <div class="mySlides" id="1">
                                                <div class="numbertext">1 / 3</div>
                                                <Player
                                                    sourceVideo={{
                                                        "src": 'https://intempioms01-use2.streaming.media.azure.net/6797dcd7-c807-41a0-a880-cce591dcaf70/DNA Animations.ism/manifest', "type": "application/vnd.ms-sstr+xml"
                                                    }}
                                                />
                                                <div class="text">DNA Animations</div>
                                            </div>

                                            <div class="mySlides ">
                                                <div class="numbertext">2 / 3</div>
                                                <Player
                                                    sourceVideo={{
                                                        "src": 'https://intempioms01-use2.streaming.media.azure.net/aa400373-2fc3-4b55-a797-be379fd6eec4/Molecular Motor Proteins.ism/manifest', "type": "application/vnd.ms-sstr+xml"
                                                    }}
                                                />
                                                <div class="text">Molecular Motor Proteins</div>
                                            </div>

                                            <div class="mySlides ">
                                                <div class="numbertext">3 / 3</div>
                                                <Player
                                                    sourceVideo={{
                                                        "src": 'https://intempioms01-use2.streaming.media.azure.net/3055775f-175e-4653-a8e6-dcd01ead7947/Drew Berry - Animations of unsee.ism/manifest', "type": "application/vnd.ms-sstr+xml"
                                                    }}
                                                />
                                                { /* <img src="./assets/img/video-icons/posts-photo.jpg" style={{ width: "100%" }}></img>*/}
                                                <div class="text">Drew Berry - Animations of unsee</div>
                                            </div>

                                            <a class="prev" onClick={() => this.plusSlides(-1)}>&#10094;</a>
                                            <a class="next" onClick={() => this.plusSlides(1)}>&#10095;</a>
                                            <div class="bottom-dots" style={{ textAlign: "center" }} >
                                                <span class="dot" onClick={() => this.currentSlide(1)}></span>
                                                <span class="dot" onClick={() => this.currentSlide(2)}></span>
                                                <span class="dot" onClick={() => this.currentSlide(3)}></span>
                                            </div>
                                        </div>

                                        <div class="questions">
                                            <div class="header">
                                                <div class="header-content">
                                                    Rank following content
                                                </div>
                                                <div class="fa fa-times-circle close-button"> </div>

                                            </div>
                                            <div class="posts-item">

                                                <form class="form-inline" >

                                                    <div class="form-group">
                                                        <div class="question" >01). modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem  dolore magnam aliquam quaerat voluptatem</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>





                                            </div>
                                            <div class="posts-item">

                                                <form class="form-inline" >

                                                    <div class="form-group">
                                                        <div class="question" >02). modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem  dolore magnam aliquam quaerat voluptatem</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>





                                            </div>
                                            <div class="posts-item">

                                                <form class="form-inline" >

                                                    <div class="form-group">
                                                        <div class="question" >03). modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem  dolore magnam aliquam quaerat voluptatem</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>





                                            </div>
                                            <div class="posts-item">

                                                <form class="form-inline" >

                                                    <div class="form-group">
                                                        <div class="question" >04). modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem  dolore magnam aliquam quaerat voluptatem</div>
                                                        <div class="form-input-div">
                                                            <div class="popularity">

                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
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
                            <div class="collapsible">
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
                                        <h3>Tom Smith</h3>
                                        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                                        sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                        voluptatem.
                    </p>
                                    </div>
                                    <div class="ranking-star-thumbnail" style={{
                                        background: "url( " + require('../assets/img/dba_720x25.png') + ")"
                                    }}>

                                    </div>

                                </div>
                            </div>
                            <div class="content" style={{ display: "none" }}>
                                <div class="video">
                                    <h3>Tom Smith</h3>
                                  coming soon!
                                </div>
                                <div class="questions">
                                    <div class="header">
                                        <div class="header-content">
                                           
                                                </div>
                                        <div class="fa fa-times-circle close-button"> </div>

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

