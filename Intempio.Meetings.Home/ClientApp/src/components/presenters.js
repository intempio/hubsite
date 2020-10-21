import React, { Component } from 'react';

export default class Presenters extends Component {

    constructor(props) {
        super(props);
        this.state = { presenters: [], loading: true };
    }

    openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }


    async getPresenters() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetPresenters', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });


        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (item && item.value) {
                this.setState({ presenters: item.value });
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

        this.getPresenters();
    }
    render() {

        return (

            <div class="presenters">
                <h3>{this.props.cname}</h3>
                <div class="presenters-container">

                    {this.state.loading && <div class="sessions-item">loading...</div>}
                    {this.state.presenters && this.state.presenters.length == 0 && !this.state.loading && <div class="sessions-item"> There are no presenter profiles available.</div>}
                    {

                        this.state.presenters && this.state.presenters.sort(function (a, b) {
                            if (a.fields.Title < b.fields.Title) { return -1; }
                            if (a.fields.Title > b.fields.Title) { return 1; }
                            return 0;
                        }).map((item, i) => {

                            //    var item = JSON.parse(item.fields);


                            var pic = item.fields.Picture ? item.fields.Picture.Url :  require("../assets/img/presenters-icons/man-icon.png") ;
                            // pic = 'https://localhost:44399/static/media/recent_1.ef629f6a.jpg';
                            return (<div class="presenter">
                                <div class="presenter-image" >
                                    <img src={pic} alt="man-icon" />
                                </div>
                                <div class="position">{item.fields.Description}</div>
                                <div class="name">{item.fields.Title}</div>
                                <div class="socials">
                                    {!item.fields.fb && !item.fields.twitter && !item.fields.linkedin && <div class="profiletitle" onClick={() => this.openInNewTab(item.fields.Profile ? item.fields.Profile.Url : '#')}>{item.fields.ProfileTitle} </div>}
                                    {item.fields.fb && <a href={item.fields.fb}>
                                        <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3.459 20.9766V12.2608H0.790527V8.33987H3.52001V5.09523C3.52001 5.09523 3.64454 1.00832 7.14551 0.976562H11.042V4.82425H8.625C8.625 4.82425 7.6045 4.82425 7.6045 5.97417C7.6045 7.12163 7.6045 8.40827 7.6045 8.40827H11.1006L10.6807 12.3267H7.66551V20.9766H3.459Z"
                                                fill="#5E5E5E" />
                                        </svg>
                                    </a>}
                                    {
                                        item.fields.twitter &&  <a class="twitter" href={item.fields.twitter}>
                                            <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M18.9422 1.73554C18.2785 2.02924 17.569 2.22759 16.8214 2.31914C17.5843 1.86141 18.1717 1.13668 18.4463 0.274634C17.733 0.698029 16.9435 1.00699 16.1005 1.17101C15.4254 0.450095 14.4641 0 13.4037 0C11.3631 0 9.71143 1.65544 9.71143 3.69612C9.71143 3.98601 9.74195 4.26828 9.80679 4.5391C6.73622 4.38652 4.01277 2.91418 2.19331 0.675143C1.87672 1.2206 1.69363 1.8576 1.69363 2.53274C1.69363 3.81437 2.34589 4.94724 3.33762 5.61093C2.73114 5.59568 2.15898 5.42785 1.66312 5.1494C1.66312 5.16465 1.66312 5.17991 1.66312 5.19517C1.66312 6.98792 2.93711 8.47934 4.62688 8.81882C4.31791 8.90273 3.98988 8.94851 3.65422 8.94851C3.41772 8.94851 3.18505 8.92562 2.96 8.87985C3.42917 10.3484 4.79471 11.4164 6.412 11.4469C5.14945 12.4387 3.55504 13.0299 1.82332 13.0299C1.5258 13.0299 1.23209 13.0108 0.9422 12.9765C2.57475 14.0369 4.51626 14.6472 6.59891 14.6472C13.3961 14.6472 17.1113 9.01335 17.1113 4.12715C17.1113 3.96694 17.1075 3.80674 17.0999 3.65035C17.8208 3.12778 18.4463 2.47552 18.9422 1.73554Z"
                                                    fill="#67B1E2" />
                                            </svg>
                                        </a>}
                                    {item.fields.linkedin && <a href={item.fields.linkedin}>
                                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.21053 5.26318H0V20H4.21053V5.26318Z" fill="#5E5E5E" />
                                            <path
                                                d="M14.2095 5.26318C11.2716 5.26318 10.7663 6.33476 10.5263 7.36845V5.26318H6.3158V20H10.5263V11.579C10.5263 10.2137 11.2663 9.47371 12.6316 9.47371C13.9642 9.47371 14.7368 10.1979 14.7368 11.579V20H18.9474V12.6316C18.9474 8.42108 18.399 5.26318 14.2095 5.26318Z"
                                                fill="#5E5E5E" />
                                            <path
                                                d="M2.10526 4.21053C3.26797 4.21053 4.21053 3.26797 4.21053 2.10526C4.21053 0.942558 3.26797 0 2.10526 0C0.942558 0 0 0.942558 0 2.10526C0 3.26797 0.942558 4.21053 2.10526 4.21053Z"
                                                fill="#5E5E5E" />
                                        </svg>
                                    </a>}
                                </div>
                            </div>);

                        })}

                </div>
                { this.state.aa && <div class="presenters-container-swiper">
                    <div class="swiper-wrapper">
                        <div class="presenter swiper-slide">
                            <div class="presenter-image">
                                <img src={require("../assets/img/presenters-icons/man-icon.png")} alt="man-icon" />
                            </div>
                            <div class="position">SVP of Marketing Stance</div>
                            <div class="name">Nicole Bates</div>
                            <div class="socials">
                                <a href="https://facebook.com/">
                                    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.459 20.9766V12.2608H0.790527V8.33987H3.52001V5.09523C3.52001 5.09523 3.64454 1.00832 7.14551 0.976562H11.042V4.82425H8.625C8.625 4.82425 7.6045 4.82425 7.6045 5.97417C7.6045 7.12163 7.6045 8.40827 7.6045 8.40827H11.1006L10.6807 12.3267H7.66551V20.9766H3.459Z"
                                            fill="#5E5E5E" />
                                    </svg>
                                </a>
                                <a class="twitter" href="https://twitter.com/">
                                    <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18.9422 1.73554C18.2785 2.02924 17.569 2.22759 16.8214 2.31914C17.5843 1.86141 18.1717 1.13668 18.4463 0.274634C17.733 0.698029 16.9435 1.00699 16.1005 1.17101C15.4254 0.450095 14.4641 0 13.4037 0C11.3631 0 9.71143 1.65544 9.71143 3.69612C9.71143 3.98601 9.74195 4.26828 9.80679 4.5391C6.73622 4.38652 4.01277 2.91418 2.19331 0.675143C1.87672 1.2206 1.69363 1.8576 1.69363 2.53274C1.69363 3.81437 2.34589 4.94724 3.33762 5.61093C2.73114 5.59568 2.15898 5.42785 1.66312 5.1494C1.66312 5.16465 1.66312 5.17991 1.66312 5.19517C1.66312 6.98792 2.93711 8.47934 4.62688 8.81882C4.31791 8.90273 3.98988 8.94851 3.65422 8.94851C3.41772 8.94851 3.18505 8.92562 2.96 8.87985C3.42917 10.3484 4.79471 11.4164 6.412 11.4469C5.14945 12.4387 3.55504 13.0299 1.82332 13.0299C1.5258 13.0299 1.23209 13.0108 0.9422 12.9765C2.57475 14.0369 4.51626 14.6472 6.59891 14.6472C13.3961 14.6472 17.1113 9.01335 17.1113 4.12715C17.1113 3.96694 17.1075 3.80674 17.0999 3.65035C17.8208 3.12778 18.4463 2.47552 18.9422 1.73554Z"
                                            fill="#67B1E2" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/">
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.21053 5.26318H0V20H4.21053V5.26318Z" fill="#5E5E5E" />
                                        <path
                                            d="M14.2095 5.26318C11.2716 5.26318 10.7663 6.33476 10.5263 7.36845V5.26318H6.3158V20H10.5263V11.579C10.5263 10.2137 11.2663 9.47371 12.6316 9.47371C13.9642 9.47371 14.7368 10.1979 14.7368 11.579V20H18.9474V12.6316C18.9474 8.42108 18.399 5.26318 14.2095 5.26318Z"
                                            fill="#5E5E5E" />
                                        <path
                                            d="M2.10526 4.21053C3.26797 4.21053 4.21053 3.26797 4.21053 2.10526C4.21053 0.942558 3.26797 0 2.10526 0C0.942558 0 0 0.942558 0 2.10526C0 3.26797 0.942558 4.21053 2.10526 4.21053Z"
                                            fill="#5E5E5E" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="presenter swiper-slide">
                            <div class="presenter-image">
                                <img src={require("../assets/img/presenters-icons/woman-icon.png")} alt="woman-icon" />
                            </div>
                            <div class="position">SVP of Marketing Stance</div>
                            <div class="name">Nicole Bates</div>
                            <div class="socials">
                                <a href="https://facebook.com/">
                                    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.459 20.9766V12.2608H0.790527V8.33987H3.52001V5.09523C3.52001 5.09523 3.64454 1.00832 7.14551 0.976562H11.042V4.82425H8.625C8.625 4.82425 7.6045 4.82425 7.6045 5.97417C7.6045 7.12163 7.6045 8.40827 7.6045 8.40827H11.1006L10.6807 12.3267H7.66551V20.9766H3.459Z"
                                            fill="#5E5E5E" />
                                    </svg>
                                </a>
                                <a class="twitter" href="https://twitter.com/">
                                    <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18.9422 1.73554C18.2785 2.02924 17.569 2.22759 16.8214 2.31914C17.5843 1.86141 18.1717 1.13668 18.4463 0.274634C17.733 0.698029 16.9435 1.00699 16.1005 1.17101C15.4254 0.450095 14.4641 0 13.4037 0C11.3631 0 9.71143 1.65544 9.71143 3.69612C9.71143 3.98601 9.74195 4.26828 9.80679 4.5391C6.73622 4.38652 4.01277 2.91418 2.19331 0.675143C1.87672 1.2206 1.69363 1.8576 1.69363 2.53274C1.69363 3.81437 2.34589 4.94724 3.33762 5.61093C2.73114 5.59568 2.15898 5.42785 1.66312 5.1494C1.66312 5.16465 1.66312 5.17991 1.66312 5.19517C1.66312 6.98792 2.93711 8.47934 4.62688 8.81882C4.31791 8.90273 3.98988 8.94851 3.65422 8.94851C3.41772 8.94851 3.18505 8.92562 2.96 8.87985C3.42917 10.3484 4.79471 11.4164 6.412 11.4469C5.14945 12.4387 3.55504 13.0299 1.82332 13.0299C1.5258 13.0299 1.23209 13.0108 0.9422 12.9765C2.57475 14.0369 4.51626 14.6472 6.59891 14.6472C13.3961 14.6472 17.1113 9.01335 17.1113 4.12715C17.1113 3.96694 17.1075 3.80674 17.0999 3.65035C17.8208 3.12778 18.4463 2.47552 18.9422 1.73554Z"
                                            fill="#67B1E2" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/">
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.21053 5.26318H0V20H4.21053V5.26318Z" fill="#5E5E5E" />
                                        <path
                                            d="M14.2095 5.26318C11.2716 5.26318 10.7663 6.33476 10.5263 7.36845V5.26318H6.3158V20H10.5263V11.579C10.5263 10.2137 11.2663 9.47371 12.6316 9.47371C13.9642 9.47371 14.7368 10.1979 14.7368 11.579V20H18.9474V12.6316C18.9474 8.42108 18.399 5.26318 14.2095 5.26318Z"
                                            fill="#5E5E5E" />
                                        <path
                                            d="M2.10526 4.21053C3.26797 4.21053 4.21053 3.26797 4.21053 2.10526C4.21053 0.942558 3.26797 0 2.10526 0C0.942558 0 0 0.942558 0 2.10526C0 3.26797 0.942558 4.21053 2.10526 4.21053Z"
                                            fill="#5E5E5E" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="presenter swiper-slide">
                            <div class="presenter-image">
                                <img src="./assets/img/presenters-icons/man-icon.png" alt="man-icon" />
                            </div>
                            <div class="position">SVP of Marketing Stance</div>
                            <div class="name">Nicole Bates</div>
                            <div class="socials">
                                <a href="https://facebook.com/">
                                    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.459 20.9766V12.2608H0.790527V8.33987H3.52001V5.09523C3.52001 5.09523 3.64454 1.00832 7.14551 0.976562H11.042V4.82425H8.625C8.625 4.82425 7.6045 4.82425 7.6045 5.97417C7.6045 7.12163 7.6045 8.40827 7.6045 8.40827H11.1006L10.6807 12.3267H7.66551V20.9766H3.459Z"
                                            fill="#5E5E5E" />
                                    </svg>
                                </a>
                                <a class="twitter" href="https://twitter.com/">
                                    <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18.9422 1.73554C18.2785 2.02924 17.569 2.22759 16.8214 2.31914C17.5843 1.86141 18.1717 1.13668 18.4463 0.274634C17.733 0.698029 16.9435 1.00699 16.1005 1.17101C15.4254 0.450095 14.4641 0 13.4037 0C11.3631 0 9.71143 1.65544 9.71143 3.69612C9.71143 3.98601 9.74195 4.26828 9.80679 4.5391C6.73622 4.38652 4.01277 2.91418 2.19331 0.675143C1.87672 1.2206 1.69363 1.8576 1.69363 2.53274C1.69363 3.81437 2.34589 4.94724 3.33762 5.61093C2.73114 5.59568 2.15898 5.42785 1.66312 5.1494C1.66312 5.16465 1.66312 5.17991 1.66312 5.19517C1.66312 6.98792 2.93711 8.47934 4.62688 8.81882C4.31791 8.90273 3.98988 8.94851 3.65422 8.94851C3.41772 8.94851 3.18505 8.92562 2.96 8.87985C3.42917 10.3484 4.79471 11.4164 6.412 11.4469C5.14945 12.4387 3.55504 13.0299 1.82332 13.0299C1.5258 13.0299 1.23209 13.0108 0.9422 12.9765C2.57475 14.0369 4.51626 14.6472 6.59891 14.6472C13.3961 14.6472 17.1113 9.01335 17.1113 4.12715C17.1113 3.96694 17.1075 3.80674 17.0999 3.65035C17.8208 3.12778 18.4463 2.47552 18.9422 1.73554Z"
                                            fill="#67B1E2" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/">
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.21053 5.26318H0V20H4.21053V5.26318Z" fill="#5E5E5E" />
                                        <path
                                            d="M14.2095 5.26318C11.2716 5.26318 10.7663 6.33476 10.5263 7.36845V5.26318H6.3158V20H10.5263V11.579C10.5263 10.2137 11.2663 9.47371 12.6316 9.47371C13.9642 9.47371 14.7368 10.1979 14.7368 11.579V20H18.9474V12.6316C18.9474 8.42108 18.399 5.26318 14.2095 5.26318Z"
                                            fill="#5E5E5E" />
                                        <path
                                            d="M2.10526 4.21053C3.26797 4.21053 4.21053 3.26797 4.21053 2.10526C4.21053 0.942558 3.26797 0 2.10526 0C0.942558 0 0 0.942558 0 2.10526C0 3.26797 0.942558 4.21053 2.10526 4.21053Z"
                                            fill="#5E5E5E" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="presenter swiper-slide">
                            <div class="presenter-image">
                                <img src={require("../assets/img/presenters-icons/woman-icon.png")} alt="woman-icon" />
                            </div>
                            <div class="position">SVP of Marketing Stance</div>
                            <div class="name">Nicole Bates</div>
                            <div class="socials">
                                <a href="https://facebook.com/">
                                    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.459 20.9766V12.2608H0.790527V8.33987H3.52001V5.09523C3.52001 5.09523 3.64454 1.00832 7.14551 0.976562H11.042V4.82425H8.625C8.625 4.82425 7.6045 4.82425 7.6045 5.97417C7.6045 7.12163 7.6045 8.40827 7.6045 8.40827H11.1006L10.6807 12.3267H7.66551V20.9766H3.459Z"
                                            fill="#5E5E5E" />
                                    </svg>
                                </a>
                                <a class="twitter" href="https://twitter.com/">
                                    <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18.9422 1.73554C18.2785 2.02924 17.569 2.22759 16.8214 2.31914C17.5843 1.86141 18.1717 1.13668 18.4463 0.274634C17.733 0.698029 16.9435 1.00699 16.1005 1.17101C15.4254 0.450095 14.4641 0 13.4037 0C11.3631 0 9.71143 1.65544 9.71143 3.69612C9.71143 3.98601 9.74195 4.26828 9.80679 4.5391C6.73622 4.38652 4.01277 2.91418 2.19331 0.675143C1.87672 1.2206 1.69363 1.8576 1.69363 2.53274C1.69363 3.81437 2.34589 4.94724 3.33762 5.61093C2.73114 5.59568 2.15898 5.42785 1.66312 5.1494C1.66312 5.16465 1.66312 5.17991 1.66312 5.19517C1.66312 6.98792 2.93711 8.47934 4.62688 8.81882C4.31791 8.90273 3.98988 8.94851 3.65422 8.94851C3.41772 8.94851 3.18505 8.92562 2.96 8.87985C3.42917 10.3484 4.79471 11.4164 6.412 11.4469C5.14945 12.4387 3.55504 13.0299 1.82332 13.0299C1.5258 13.0299 1.23209 13.0108 0.9422 12.9765C2.57475 14.0369 4.51626 14.6472 6.59891 14.6472C13.3961 14.6472 17.1113 9.01335 17.1113 4.12715C17.1113 3.96694 17.1075 3.80674 17.0999 3.65035C17.8208 3.12778 18.4463 2.47552 18.9422 1.73554Z"
                                            fill="#67B1E2" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/">
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.21053 5.26318H0V20H4.21053V5.26318Z" fill="#5E5E5E" />
                                        <path
                                            d="M14.2095 5.26318C11.2716 5.26318 10.7663 6.33476 10.5263 7.36845V5.26318H6.3158V20H10.5263V11.579C10.5263 10.2137 11.2663 9.47371 12.6316 9.47371C13.9642 9.47371 14.7368 10.1979 14.7368 11.579V20H18.9474V12.6316C18.9474 8.42108 18.399 5.26318 14.2095 5.26318Z"
                                            fill="#5E5E5E" />
                                        <path
                                            d="M2.10526 4.21053C3.26797 4.21053 4.21053 3.26797 4.21053 2.10526C4.21053 0.942558 3.26797 0 2.10526 0C0.942558 0 0 0.942558 0 2.10526C0 3.26797 0.942558 4.21053 2.10526 4.21053Z"
                                            fill="#5E5E5E" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>}
            </div>


        )
    }
}

