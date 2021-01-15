import React, { Component } from 'react';
import moment from 'moment-timezone';
export default class Event extends Component {

    constructor(props) {
        super(props);
        this.state = { sdate: '', location: '', title: '', loading: false, dCount: 0, hCount: 0, mCount: 0, sCount: 0, buttonStatus: false, Banner: null };


    }


 

    async getEvents() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetMeetingInfo', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });
            if (item && item.value[0].fields.Title) {

                var momentObj = moment.utc(item.value[0].fields.StartDate);
                //Apply Moment.Js Formatter to your desire date format
                var formattedStartDate = momentObj.local().format('DD MMM YYYY');
                this.countdown(item.value[0].fields.StartDate);
                this.setState({ title: item.value[0].fields.Title, sdate: formattedStartDate, location: item.value[0].fields.Location, Banner: item.value[0].fields.Banner.Url });
                return true;

            } else {
                return false;
            }

        }).catch((error) => {
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


                var momentObj = moment.utc(item.intempioSettings.startDate);
                //Apply Moment.Js Formatter to your desire date format
                var formattedStartDate = momentObj.local().format('DD MMM YYYY');
                this.countdown(item.intempioSettings.startDate);

                this.setState({ title: item.intempioSettings.title, sdate: formattedStartDate, loading: false, location: item.intempioSettings.location, Banner: item.intempioSettings.banner, localDate: item.intempioSettings.localDate});


            } else {

                this.setState({ invalidKey: true, load: true });

                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }
    countdown = (startDate) => {

        var interval = 1000;

        setInterval(() => {
            var startM = moment.utc(Date.now());
            var start = startM.local();

            if (this.props.localDate == 'true' || this.props.localDate == 'True') { start = moment.utc(startM).tz("America/New_York"); }
            var endM = moment.utc(startDate);
            var end = endM.local();
            if (this.props.localDate == 'true' || this.props.localDate == 'True') { end = moment.utc(endM).tz("America/New_York"); }
            var duration = moment.duration(end.diff(start));
            var dc = duration.asDays().toString();
            this.setState({ dCount: dc.split(".")[0], hCount: duration.hours(), mCount: duration.minutes(), sCount: duration.seconds() });

        }, interval);
    }
    componentDidMount() {
        this.setState({ buttonStatus: this.props.buttonStatus == "false" });
        this.getSettingsv2();
    }


    render() {

        return (
            <>
                <div class="skelleton-main-events skelleton-loading" style={{ display: this.state.loading ? "" : "none" }}>
              
              
         
                </div>

                <div class="events" style={{ padding: this.props.buttonStatus ? "20px" : "0px", display: !this.state.loading ? "" : "none" }}   >

                    {this.state.Banner && <img src={this.state.Banner} class="banner-img" />}
                    <h3>{this.state.sdate} {this.state.location}  </h3>
             

                    {
                        this.state.counter && <div class="events-footer">
                            <div class="events-time" style={{ display: this.state.sCount < 0 ? "none" : "contents" }}>
                                <div class="date">
                                    <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip200)">
                                            <path
                                                d="M39.904 5.82858C38.5255 6.05314 37.171 5.20582 36.8641 3.84324C36.5571 2.48066 37.4124 1.12009 38.7893 0.885627C50.1718 -1.05258 61.7133 1.24828 71.5464 7.4655C81.3797 13.6829 88.4074 23.1232 91.5371 34.2376C91.9157 35.5821 91.0532 36.9381 89.6907 37.245C88.3281 37.552 86.9818 36.6917 86.5936 35.35C80.7558 15.1752 60.6333 2.45188 39.904 5.82858Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M51.8167 89.5464C50.4306 89.718 49.3686 90.9116 49.4566 92.3055C49.5446 93.6995 50.7475 94.7651 52.1349 94.6035C63.6036 93.2674 74.0347 87.8181 81.7262 79.0898C89.4179 70.3613 93.5119 59.3274 93.3946 47.7813C93.3804 46.3846 92.1719 45.3253 90.7779 45.4134C89.384 45.5014 88.3335 46.7051 88.3377 48.1018C88.4001 69.1042 72.6601 86.9662 51.8167 89.5464Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M6.71273 59.5038C6.33394 58.1595 4.99379 57.2897 3.62909 57.5871C2.26438 57.8844 1.39244 59.2344 1.76156 60.5814C4.81294 71.7173 11.7738 81.2066 21.5628 87.493C31.352 93.7796 42.8773 96.1618 54.2735 94.3036C55.652 94.0788 56.5168 92.7243 56.2195 91.3596C55.9221 89.9949 54.5736 89.1381 53.1935 89.3529C32.4411 92.5837 12.4085 79.7192 6.71273 59.5038Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M5.43815 42.4739C5.62222 41.0893 4.73556 39.7603 3.36458 39.4934C1.99358 39.2265 0.658656 40.1213 0.464654 41.5045C-1.13914 52.9389 1.49898 64.4081 8.0017 74.0547C14.5046 83.7016 24.1468 90.4496 35.3482 93.2522C36.7031 93.5912 38.0333 92.6894 38.3002 91.3184C38.5671 89.9474 37.6677 88.627 36.3152 88.2783C15.978 83.0342 2.67041 63.2932 5.43815 42.4739Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M5.07357 30.4564C3.90182 29.8551 3.38201 28.4509 3.94653 27.2609C8.56618 17.5231 16.2846 9.79672 26.012 5.16837C27.2733 4.56827 28.7555 5.18941 29.288 6.48061C29.8206 7.77182 29.2009 9.24349 27.944 9.8526C19.2447 14.0684 12.6123 21.0006 8.65269 29.1923C8.00657 30.529 6.39443 31.1344 5.07357 30.4564Z"
                                                fill="#D60E63" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip200">
                                                <rect width="95.0108" height="94.2446" fill="white"
                                                    transform="translate(81.8202 -9.2002) rotate(77.3048)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div class="time">
                                        <span class="number">{this.state.dCount}</span>
                                        <span class="text">days</span>
                                    </div>
                                </div>
                                <div class="date">
                                    <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip301)">
                                            <path
                                                d="M4.7885 47.6504C4.80667 49.047 3.76832 50.2613 2.37533 50.3633C0.982342 50.4653 -0.236757 49.4182 -0.264966 48.0218C-0.498165 36.4778 3.4846 25.4036 11.0879 16.5983C18.6914 7.79283 29.0674 2.23887 40.5225 0.787625C41.9082 0.612078 43.1217 1.66561 43.2238 3.0586C43.3258 4.45159 42.2758 5.65576 40.8915 5.84126C20.0751 8.63061 4.51519 26.6498 4.7885 47.6504Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M88.3466 48.2524C88.3112 49.6487 89.3346 50.8755 90.7262 50.9947C92.1178 51.1138 93.3497 50.0817 93.3951 48.6858C93.7701 37.1455 89.9237 26.0232 82.4292 17.1252C74.9344 8.22694 64.6275 2.54591 53.191 0.954018C51.8077 0.761458 50.5812 1.8 50.4621 3.19163C50.343 4.58326 51.3781 5.80025 52.76 6.00274C73.5406 9.04765 88.8779 27.2567 88.3466 48.2524Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M51.9627 88.4163C50.5771 88.5921 49.5187 89.7888 49.6109 91.1825C49.7031 92.5762 50.9093 93.6382 52.2961 93.4724C63.7608 92.1018 74.1754 86.6212 81.8406 77.8698C89.5061 69.1182 93.5668 58.072 93.4148 46.5263C93.3964 45.1297 92.1847 44.0741 90.791 44.1663C89.3974 44.2585 88.3505 45.4654 88.3589 46.8621C88.4844 67.8642 72.7982 85.7734 51.9627 88.4163Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M34.9316 87.1578C33.5895 86.771 32.1439 87.4513 31.6772 88.7677C31.2104 90.0841 31.8979 91.5367 33.2372 91.9332C44.3086 95.2107 56.0418 94.2981 66.5442 89.2939C77.0468 84.2895 85.1469 75.7515 89.5756 65.0879C90.1113 63.798 89.4162 62.349 88.0997 61.8823C86.7833 61.4156 85.3443 62.1097 84.7994 63.3958C76.6048 82.7336 55.1124 92.9747 34.9316 87.1578Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M23.9936 85.7406C23.2255 86.8105 21.7599 87.1169 20.6666 86.3825C11.7192 80.3733 5.2195 71.5969 2.08094 61.2918C1.674 59.9557 2.50755 58.5817 3.86332 58.246C5.2191 57.9103 6.58293 58.7408 6.99942 60.074C9.88205 69.3012 15.7569 76.8861 23.2728 82.0138C24.4992 82.8506 24.8595 84.5345 23.9936 85.7406Z"
                                                fill="#D60E63" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip301">
                                                <rect width="95.0108" height="94.2446" fill="white"
                                                    transform="translate(-3.87512 3.97266) rotate(-4.18881)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div class="time">
                                        <span class="number"> {this.state.hCount}</span>
                                        <span class="text">hours</span>
                                    </div>
                                </div>
                                <div class="date">
                                    <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip303)">
                                            <path
                                                d="M59.4751 87.9518C60.8115 87.5459 62.2666 88.2057 62.752 89.5153C63.2374 90.825 62.5706 92.2872 61.2371 92.7026C50.2134 96.137 38.4684 95.3911 27.896 90.5365C17.3233 85.6817 9.10291 77.2596 4.52324 66.6599C3.96927 65.3778 4.64375 63.9191 5.95342 63.4337C7.26309 62.9483 8.71176 63.622 9.27493 64.9001C17.7433 84.1197 39.3788 94.0546 59.4751 87.9518Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M36.5378 6.56185C37.8888 6.20749 38.7827 4.88331 38.5101 3.51344C38.2375 2.14358 36.9036 1.24732 35.55 1.59196C24.3608 4.44107 14.7469 11.2288 8.28408 20.9023C1.82115 30.576 -0.769423 42.0562 0.881957 53.4842C1.08171 54.8666 2.42035 55.7558 3.79021 55.4832C5.16008 55.2106 6.0412 53.8779 5.85138 52.4942C2.99711 31.6866 16.2225 11.8904 36.5378 6.56185Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M85.2357 30.3408C85.7898 31.6229 87.2337 32.3068 88.5468 31.8306C89.8598 31.3544 90.5445 29.9005 89.9996 28.6145C85.4947 17.9833 77.334 9.50366 66.7961 4.57454C56.258 -0.3547 44.5183 -1.18332 33.4703 2.17356C32.1339 2.57962 31.4569 4.0371 31.933 5.35015C32.4092 6.6632 33.8596 7.33313 35.1989 6.93669C55.3375 0.975375 76.9027 11.0622 85.2357 30.3408Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M88.7632 47.0501C88.7648 48.4469 89.8203 49.6462 91.2146 49.7284C92.6089 49.8107 93.813 48.7464 93.8214 47.3497C93.8907 35.8035 89.7511 24.787 82.0235 16.0906C74.2957 7.39392 63.842 1.98783 52.3674 0.699371C50.9794 0.543513 49.7809 1.61417 49.6987 3.00847C49.6164 4.40276 50.6834 5.59191 52.0702 5.75774C72.9241 8.25125 88.7383 26.0477 88.7632 47.0501Z"
                                                fill="#D60E63" />
                                            <path
                                                d="M90.7223 58.9118C91.9636 59.3521 92.6655 60.6747 92.2642 61.9291C88.9802 72.1947 82.3576 80.8787 73.3319 86.7593C72.1616 87.5218 70.6101 87.1032 69.9105 85.8943C69.211 84.6853 69.6295 83.1443 70.7943 82.3735C78.8558 77.0385 84.5077 69.286 87.343 60.6406C87.8057 59.2299 89.323 58.4155 90.7223 58.9118Z"
                                                fill="#D60E63" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip303">
                                                <rect width="95.0108" height="94.2446" fill="white"
                                                    transform="translate(19.9296 108.421) rotate(-110.336)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div class="time">
                                        <span class="number">{this.state.mCount}</span>
                                        <span class="text">mins</span>
                                    </div>
                                </div>
                                <div class="date">
                                    <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M54.103 5.86329C55.4804 6.09501 56.8392 5.25473 57.1532 3.89377C57.4673 2.53281 56.6191 1.16781 55.2434 0.9262C43.8711 -1.07109 32.3178 1.16981 22.4526 7.33588C12.5871 13.5021 5.51052 22.9058 2.32313 34.0038C1.93758 35.3463 2.79295 36.7068 4.15392 37.0208C5.51488 37.3348 6.86557 36.4815 7.26076 35.1419C13.2033 14.9977 33.3916 2.379 54.103 5.86329Z"
                                            fill="#D60E63" />
                                        <path
                                            d="M41.756 89.5182C43.1412 89.697 44.197 90.896 44.1017 92.2895C44.0065 93.683 42.798 94.7424 41.4116 94.5736C29.9499 93.1779 19.5473 87.6745 11.9012 78.9064C4.25488 70.1381 0.218281 59.0831 0.395529 47.5377C0.416969 46.1412 1.63098 45.0881 3.02445 45.1834C4.41792 45.2787 5.46214 46.4878 5.45073 47.8845C5.27925 68.8863 20.9263 86.8298 41.756 89.5182Z"
                                            fill="#D60E63" />
                                        <path
                                            d="M87.0153 59.7102C87.4011 58.3678 88.7458 57.5051 90.1089 57.8095C91.472 58.1139 92.337 59.4684 91.9609 60.8135C88.8517 71.9334 81.8416 81.3864 72.0202 87.6219C62.1985 93.8576 50.6609 96.1799 39.2745 94.2625C37.8972 94.0306 37.0394 92.6716 37.3439 91.3085C37.6483 89.9453 39.0012 89.0955 40.3802 89.3175C61.1156 92.6561 81.2147 79.8957 87.0153 59.7102Z"
                                            fill="#D60E63" />
                                        <path
                                            d="M88.3783 42.6871C88.2015 41.3016 89.095 39.9772 90.4674 39.7175C91.8397 39.4577 93.17 40.3594 93.3568 41.7436C94.9012 53.1862 92.2036 64.6414 85.6508 74.2542C79.098 83.8672 69.4208 90.565 58.205 93.3094C56.8483 93.6414 55.5228 92.7327 55.2631 91.3604C55.0033 89.988 55.9096 88.6722 57.2638 88.3305C77.628 83.1922 91.0379 63.5205 88.3783 42.6871Z"
                                            fill="#D60E63" />
                                        <path
                                            d="M88.8052 30.6723C89.9801 30.077 90.5071 28.6756 89.9488 27.4827C85.3798 17.721 77.7016 9.95463 67.9983 5.27583C66.7402 4.66919 65.2548 5.28262 64.7156 6.57105C64.1763 7.85947 64.7883 9.33434 66.042 9.94997C74.7193 14.2109 81.3157 21.1774 85.2327 29.3895C85.8719 30.7296 87.4808 31.3433 88.8052 30.6723Z"
                                            fill="#D60E63" />
                                    </svg>
                                    <div class="time">
                                        <span class="number">{this.state.sCount}</span>
                                        <span class="text">secs</span>
                                    </div>
                                </div>
                            </div>
                            {!this.props.buttonStatus && <button>Join Next Event</button>}
                        </div>

                    }

                </div >

            </>
        )
    }
}



