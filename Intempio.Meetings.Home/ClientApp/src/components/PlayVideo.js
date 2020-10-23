import React, { Component } from 'react';
import ChatContent from './Chat'
export default class PlayVideo extends Component {


    constructor(props) {
        super(props);
        this.state = {  videourl: '#' ,name:''};
    }



    componentDidMount() {

        var url = new URL(window.location);
        var vurl = url.searchParams.get("vurl");
        var vname = url.searchParams.get("name");

        this.setState({ videourl: vurl ,name:vname});

    }
 
    render() {

        return (

            <div class="video">
                <h3>{this.state.name}</h3>
                <div class="video-content">
                    {this.state.videourl == '#' ? < img src={require("../assets/img/video-icons/video-icon.jpg")} alt="video-last" class="video-last" /> :
                        this.state.videourl != '#' && <div class="video-content">
                            <iframe
                                src={`//aka.ms/ampembed?url=${this.state.videourl}`}
                                name="azuremediaplayer"
                                scrolling="no"
                                frameborder="no"
                                align="center"
                                height="600px"
                                width="1200px"
                                allowfullscreen
                            ></iframe>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
}

