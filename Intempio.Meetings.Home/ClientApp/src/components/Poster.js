import React, { Component } from 'react';
import history from './history';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
export default class Poster extends Component {

    constructor(props) {
        super(props);
        this.state = { posterSessions: [], loading: false, showModal: false };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
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
            <div id={this.props.category} class="recent">
                <h3>{this.props.cname}</h3>
                <div class="recent-container poster-container">
                    {this.state.loading && <div class="sessions-item">loading...</div>}

                    {this.state.posterSessions && this.state.posterSessions.length == 0 && !this.state.loading && <div class="sessions-item"> There are no poster events to display</div>}
                    {


                        this.state.posterSessions && this.state.posterSessions.map((item, i) => {

                            var name = item.fields.Title.indexOf('#') > -1 ? title = item.fields.Title.split('#')[0] : item.fields.Title;;
                            var title = item.fields.Title.indexOf('#') > -1 ? title = item.fields.Title.split('#')[1] : null;

                            return (<div class="recent-item" onClick={() => this.openInNewTab(item.fields.Document_x0020_URL ? item.fields.Document_x0020_URL.Url : '#')}>
                                <div class="image-wrapper">
                                    <img src={item.fields.Image_x0020_Url ? item.fields.Image_x0020_Url.Url : '#'} alt="recent_1" class="recent-image" />
                                </div>
                                {
                                    item.fields.RemoveButton == false ? <div class="recent-info">
                                        <p class="bold">{item.fields.ButtonTitle != item.fields.Title ? name : ''}</p>
                                        {title && <p class="italic">{item.fields.ButtonTitle != item.fields.Title ? title : ''}</p>}
                                        <div className="poster-item">
                                            <button className="buttonposter" onClick={() => this.openInNewTab(item.fields.Event_x0020_URL ? item.fields.Event_x0020_URL.Url : '#')}>{item.fields.ButtonTitle}</button></div>
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


                            this.state.posterSessions && this.state.posterSessions.map((item, i) => {
                                var name = item.fields.Title.indexOf('#') > -1 ? title = item.fields.Title.split('#')[0] : item.fields.Title;;
                                var title = item.fields.Title.indexOf('#') > -1 ? title = item.fields.Title.split('#')[1] : null;


                                return (<div class="recent-item" onClick={() => this.openInNewTab(item.fields.Document_x0020_URL ? item.fields.Document_x0020_URL.Url : '#')}>
                                    <div class="image-wrapper">
                                        <img src={item.fields.Image_x0020_Url ? item.fields.Image_x0020_Url.Url : '#'} alt="recent_1" class="recent-image" />
                                    </div>
                                    {
                                        item.fields.RemoveButton == false ? < div class="recent-info">
                                            <p class="bold">{item.fields.ButtonTitle != item.fields.Title ? name : ''}</p>
                                            {title && <p class="italic">{item.fields.ButtonTitle != item.fields.Title ? title : ''}</p>}
                                            <div className="poster-item" >
                                                <button className="buttonposter" onClick={() => this.openInNewTab(item.fields.Event_x0020_URL ? item.fields.Event_x0020_URL.Url : '#')}>{item.fields.ButtonTitle}</button></div>
                                        </div> : <div> </div>}



                                </div>);

                            })
                        }



                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>

        )
    }
}

