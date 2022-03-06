import React, { Component } from 'react';
import history from './history';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { ActivityLog } from './ActivityLog';
import Modal from 'react-modal';
import { isUndefined } from 'lodash';
export default class Poster extends Component {

    constructor(props) {
        super(props);
        this.state = { posterSessions: [], loading: false, showModal: false, email:'' , popupDescription :'' };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    openInNewTab = (url) => {

        if (url != '#') {
            ActivityLog.getStringValue(this.state.email, "Poster-Clicked", url);
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
            if (newWindow) { newWindow.opener = null }
        }
    }

    openInNewTabV1 = (des, url) => {

        if (!isUndefined(des)) {

            this.setState({ popupDescription: des });
            this.handleOpenModal();
        }
        else {
            if (url != '#') {
                ActivityLog.getStringValue(this.state.email, "Poster-Clicked", url);
                const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
                if (newWindow) { newWindow.opener = null }
            }
        }
    }

    async getGetPosterSessions() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetPosterSessions?cetegory=' + this.props.category, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var items = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (items) {

                this.setState({ posterSessions: items });
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

        let token = localStorage.getItem('userToken')
        let email = '';
        token = JSON.parse(token);
        if (token) {
            email = token.email;
        }
        this.setState({ email: email })

        this.getGetPosterSessions();
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }


    render() {

        return (

            <>
                <div class="skeleton-presenters" style={{ display: this.state.loading ? "" : "none" }}>
                    <h3 class="skelleton-loading ">Presenters</h3>
                    <div class="skeleton-presenters-container">
                        <div class="presenter">
                            <div class="skelleton-loading presenter-wrapper">
                                <div class="presenter-image">
                                </div>
                                <div class="position">SVP of Marketing Stance</div>
                                <div class="name">Nicole Bates</div>
                            </div>
                          
                        </div>
                        <div class="presenter">
                            <div class="skelleton-loading presenter-wrapper">
                                <div class="presenter-image">
                                </div>
                                <div class="position">SVP of Marketing Stance</div>
                                <div class="name">Nicole Bates</div>
                            </div>
                          
                        </div>
                        <div class="presenter">
                            <div class="skelleton-loading presenter-wrapper">
                                <div class="presenter-image">
                                </div>
                                <div class="position">SVP of Marketing Stance</div>
                                <div class="name">Nicole Bates</div>
                            </div>
                           
                        </div>
                        <div class="presenter">
                            <div class="skelleton-loading presenter-wrapper">
                                <div class="presenter-image">
                                </div>
                                <div class="position">SVP of Marketing Stance</div>
                                <div class="name">Nicole Bates</div>
                            </div>
                     
                        </div>
                    </div>
                </div>
                <div id={this.props.category} class="recent" style={{ display: !this.state.loading ? "" : "none" }}>
                    <h3>{this.props.cname}</h3>
                    <div class="recent-container poster-container">
                        {this.state.loading && <div class="sessions-item">loading...</div>}

                        {this.state.posterSessions && this.state.posterSessions.length == 0 && !this.state.loading && <div class="sessions-item"> There are no poster events to display</div>}
                        {


                            this.state.posterSessions && this.state.posterSessions.length && this.state.posterSessions.map((item, i) => {

                                var name = item.fields.Title.indexOf('#') > -1 ? title = item.fields.Title.split('#')[0] : item.fields.Title;;
                                var title = item.fields.Title.indexOf('#') > -1 ? title = item.fields.Title.split('#')[1] : null;

                                return (<div class="recent-item" onClick={() => this.openInNewTabV1(item.fields.PopupDescription,item.fields.Document_x0020_URL ? item.fields.Document_x0020_URL.Url : '#')}>
                                    <div class="image-wrapper">
                                        <img src={item.fields.Image_x0020_Url ? item.fields.Image_x0020_Url.Url : '#'} alt="recent_1" class="recent-image" />
                                    </div>
                                    {
                                        item.fields.RemoveButton == false ? <div class="recent-info">
                                            <p class="bold">{item.fields.ButtonTitle != item.fields.Title ? name : ''}</p>
                                            {title && <p class="italic">{item.fields.ButtonTitle != item.fields.Title ? title : ''}</p>}
                                            <div className="poster-item">
                                                <button className="buttonposter" onClick={() => this.openInNewTabV1(item.fields.PopupDescription,item.fields.Event_x0020_URL ? item.fields.Event_x0020_URL.Url : '#')}>{item.fields.ButtonTitle}</button></div>
                                        </div> : <div> </div>}
                                </div>);

                            })
                        }

                    </div>
                    <div class="recent-container-swiper">

                        <div class="swiper-wrapper">

                            {this.state.loading && <div class="sessions-item">loading...</div>}

                            {this.state.posterSessions && this.state.posterSessions.length == 0 && !this.state.loading && <div class="sessions-item"> There are no poster events to display</div>}
                            {


                                this.state.posterSessions && this.state.posterSessions.length > 0 && this.state.posterSessions.map((item, i) => {
                                    var name = item.fields.Title.indexOf('#') > -1 ? title = item.fields.Title.split('#')[0] : item.fields.Title;;
                                    var title = item.fields.Title.indexOf('#') > -1 ? title = item.fields.Title.split('#')[1] : null;


                                    return (<div class="recent-item" onClick={() => this.openInNewTabV1(item.fields.PopupDescription,item.fields.Document_x0020_URL ? item.fields.Document_x0020_URL.Url : '#')}>
                                        <div class="image-wrapper">
                                            <img src={item.fields.Image_x0020_Url ? item.fields.Image_x0020_Url.Url : '#'} alt="recent_1" class="recent-image" />
                                        </div>
                                        {
                                            item.fields.RemoveButton == false ? < div class="recent-info">
                                                <p class="bold">{item.fields.ButtonTitle != item.fields.Title ? name : ''}</p>
                                                {title && <p class="italic">{item.fields.ButtonTitle != item.fields.Title ? title : ''}</p>}
                                                <div className="poster-item" >
                                                    <button className="buttonposter" onClick={() => this.openInNewTabV1(item.fields.PopupDescription,item.fields.Event_x0020_URL ? item.fields.Event_x0020_URL.Url : '#')}>{item.fields.ButtonTitle}</button></div>
                                            </div> : <div> </div>}



                                    </div>);

                                })
                            }



                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                    <Modal isOpen={this.state.showModal} className="modalPoster">
                        <a onClick={this.handleCloseModal} class="close1" />
                        <div className="login-poup PosterPopup" dangerouslySetInnerHTML={{
                            __html: this.state.popupDescription
                        }}>
                        </div>
                    </Modal>
                </div>
            </>
        )
    }
}

