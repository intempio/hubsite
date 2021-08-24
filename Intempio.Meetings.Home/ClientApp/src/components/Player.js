import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Player extends Component {
    static propTypes = {
        ampLoadTimeout: PropTypes.number,
        sourceVideo: PropTypes.object.isRequired
    }

    static defaultProps = {
        ampLoadTimeout: 300,
    };

    componentDidMount() {
        this.waitForAmp().then((amp) => {
            this.videoPlayer = this.createVideoPlayer(amp);
            this.videoPlayer.src([this.props.sourceVideo]);
        }).catch(e => console.error('Could not found Azure Media Player plugin', e));
    }

    createVideoPlayer = (amp) => {
        const video = amp(this.videoRef, {
            nativeControlsForTouch: false,
            autoplay: false,
            muted: false,
            controls: true,
            logo: { enabled: false },
            techOrder: [
                'azureHtml5JS',
                'html5FairPlayHLS',
                'html5',
            ],
        });

        video.addEventListener(amp.eventName.error, (errorDetails) => {
            console.log(errorDetails);
        });

        return video;
    }
    //https://stackoverflow.com/questions/66423804/how-to-properly-setup-azure-media-player-in-react-js
    waitForAmp = () => {
        return new Promise((resolve, reject) => {
            let waited = 0;
            const wait = (interval) => {
                setTimeout(() => {
                    waited += interval;
                    const amp = window['amp'];
                    if (amp !== undefined) {
                        return resolve(amp);
                    }
                    if (waited >= this.props.ampLoadTimeout * 100) {
                        return reject();
                    }
                    wait(interval * 2);
                    return null;
                }, interval);
            };
            wait(30);
        });
    }

    render() {
        return (
            <div className="Player-video-container">
                <video
                    className="azuremediaplayer amp-default-skin amp-big-play-centered"
                    ref={(input) => { this.videoRef = input; }}
                    style={{ width: '90%' }} tabIndex="0"
                    data-setup='{ "controls": true, "autoplay": false }'
                >
                </video>
                <button className="btnPlay" style={{ display:"none" }} onClick={() => (this.videoPlayer.play())}> aa  </button>
                <button className="btnPhase" style={{ display: "none" }} onClick={() => (this.videoPlayer.pause())}> aa  </button>
            </div>
        );
    }
}

export default Player;