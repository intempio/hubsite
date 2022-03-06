import React, { Component } from 'react';
import history from './history';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { ActivityLog } from './ActivityLog';
export default class Paragraph extends Component {

    constructor(props) {
        super(props);
        this.state = { paragraphs: [], loading: false, showModal: false, email: '', content:'' };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    openInNewTab = (url) => {

        if (url != '#') {
            ActivityLog.getStringValue(this.state.email, "Poster-Clicked", url);
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }
    }

    async getGetParagraphs() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetParagraphs', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var items = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (items) {

                this.setState({ paragraphs: items });

                this.state.paragraphs && this.state.paragraphs.length && this.state.paragraphs.map((item, i) => {

                    var name = item.fields.Title;;
                    if (name == this.props.desc) {

                        this.setState({ content: item.fields.Content })
                        return ;
                    }

                })
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
        this.getGetParagraphs();

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

                                <div class="position">SVP of Marketing Stance</div>
                                <div class="name">Nicole Bates</div>
                            </div>

                        </div>
                        <div class="presenter">
                            <div class="skelleton-loading presenter-wrapper">

                                <div class="position">SVP of Marketing Stance</div>
                                <div class="name">Nicole Bates</div>
                            </div>

                        </div>
                        <div class="presenter">
                            <div class="skelleton-loading presenter-wrapper">

                                <div class="position">SVP of Marketing Stance</div>
                                <div class="name">Nicole Bates</div>
                            </div>

                        </div>
                        <div class="presenter">
                            <div class="skelleton-loading presenter-wrapper">

                                <div class="position">SVP of Marketing Stance</div>
                                <div class="name">Nicole Bates</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div id={this.props.category} class="recent" style={{ display: !this.state.loading ? "" : "none" }}>
                    <h3>{this.props.cname}</h3>
                    <div class="paragraph-container">
                        {this.state.loading && <div class="sessions-item">loading...</div>}
                        <div class="name" dangerouslySetInnerHTML={{
                            __html: this.state.content
                        }}>

                           

                        </div>


                    </div>
               
                </div>
            </>
        )
    }
}

