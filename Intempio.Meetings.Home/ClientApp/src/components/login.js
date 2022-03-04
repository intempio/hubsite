import React, { Component } from 'react';
import history from './history';
import Events from './events';
import moment from 'moment';
import { ActivityLog } from './ActivityLog';
import Modal from 'react-modal';
//import ReCAPTCHA from 'react-google-recaptcha';


//const recaptchaRef = React.createRef();
//const SITE_KEY = "6LehCi8aAAAAACMZorVoHGEZpFdUHNqyKSSkz6tV";

Modal.defaultStyles.overlay.backgroundColor = '#343a40a3';
export class Login extends Component {

    constructor(props) {
        super(props);
                  
        this.state = { firstName: '', lastName: '', email: '', loading: false, emailinput: '', inputFirstName: '', inputLastName: '', status: '', colour: '#FFFFFF', unrecognizedLogin: false, excelLogin: false, sqllogin: false, showModal: false, country: '', site: '', tp: 'n/a', role: '', btnLoading: false, canLoginRequest: false, loginRequestSuccessMessage: '', loginRequestMessage: '', loginFormCaption:'' };

        this.reCaptchaRef = React.createRef();
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
            this.setState({ loading: false, unrecognizedLogin: item.value[0].fields.UnrecognizedLogin, excelLogin: item.value[0].fields.Excellogin, sqllogin: item.value[0].fields.SQLlogin });
            if (item && item.value[0].fields.Colour) {
                document
                    .documentElement.style.setProperty("--color-surface", item.value[0].fields.Colour);
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

    async addMeetingUserActivity() {
        const activityResponse = await fetch('Meeting/AddMeetingUserActivity?email=' + this.state.emailinput, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        });

        await activityResponse.json().then(() => {
            console.log("Added");
        }).catch((err) => {
            console.log(err);
        });
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

                this.setState({
                    loading: false, unrecognizedLogin: (item.intempioSettings.unrecognizedLogin.toLowerCase() === 'true'), excelLogin: (item.intempioSettings.excellogin.toLowerCase() === 'true'),
                    sqllogin: (item.intempioSettings.sqlLogin.toLowerCase() === 'true'), canLoginRequest: (item.intempioSettings.canLoginRequest.toLowerCase() === 'true'),
                    loginRequestSuccessMessage: item.intempioSettings.loginRequestSuccessMessage, loginRequestMessage: item.intempioSettings.loginRequestMessage, loginFormCaption: item.intempioSettings.loginFormCaption
                });
                if (item && item.intempioSettings.colour) {
                    document
                        .documentElement.style.setProperty("--color-surface", '#' + item.intempioSettings.colour);
                    return true;

                } else {
                    return false;
                }

            } else {

                this.setState({ invalidKey: true, load: true });

                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }


    async getUserInfo() {
        this.setState({ loading: true });
        const query = new URLSearchParams(this.props.location.search);
        const eventID = query.get('eventid')
        const response = await fetch('Meeting/GetUserByEmail?email=' + this.state.emailinput, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

        await response.json().then((resonse) => {
            this.setState({ loading: false });

            var items = JSON.parse(resonse.value).value;
            if (items.length > 0) {
                var userObj = { firstName: items[0].fields.FirstName, lastName: items[0].fields.LastName, email: items[0].fields.Email, inputFirstName: this.state.inputFirstName, inputLastName: this.state.inputLastName, exp: moment().add(7, 'days'), unrecognizedLogin: false };
                this.setState({ firstName: items[0].fields.FirstName, lastName: items[0].fields.LastName, email: items[0].fields.Email });



                if (this.state.email && this.state.email != '') {
                    localStorage.setItem("userToken", JSON.stringify(userObj));
                    ActivityLog.getStringValue(this.state.emailinput, "login", "Success");
                    history.push('/');
                }
            }
            else {
                if (eventID) { this.setState({ status: 3 }) } else {
                    this.setState({ status: 2 });
                }
            }
        }).catch((error) => {
            this.setState({ status: 2 });
            this.setState({ loading: false });
        });
    }

    async getExcelUserUserInfo() {
        this.setState({ loading: true });
        const query = new URLSearchParams(this.props.location.search);
        const eventID = query.get('eventid')
        const response = await fetch('Meeting/GetExcelUserByEmail?email=' + this.state.emailinput, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

        await response.json().then((resonse) => {
            this.setState({ loading: false });
            var items = JSON.parse(resonse.value).values;

            let userobj = items.find(o => o[0].toLowerCase() === this.state.emailinput.toLowerCase());
            if (userobj != null) {
                var userObj = { firstName: null, lastName: null, email: userobj[0], inputFirstName: this.state.inputFirstName, inputLastName: this.state.inputLastName, exp: moment().add(7, 'days'), unrecognizedLogin: false };
                this.setState({ firstName: null, lastName: null, email: userobj[0] });



                if (this.state.email && this.state.email != '') {
                    localStorage.setItem("userToken", JSON.stringify(userObj));
                    ActivityLog.getStringValue(this.state.emailinput, "login", "Success");
                    history.push('/');
                }
            }
            else {
                if (eventID) {
                    this.setState({ status: 3 })
                    ActivityLog.getStringValue(this.state.emailinput, "login", "User redirection is under development");
                } else {
                    this.setState({ status: 2 });
                    ActivityLog.getStringValue(this.state.emailinput, "login", "Validation:This email is not registered for this event");
                }
            }
        }).catch((error) => {
            ActivityLog.getStringValue(this.state.emailinput, "login", "Error");
            this.setState({ status: 2 });
            this.setState({ loading: false });
        });
    }


    async getSQLUserUserInfo() {
        this.setState({ loading: true });



        const response = await fetch('Meeting/GetSQLUserByEmail?email=' + this.state.emailinput, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

        await response.json().then((resonse) => {
            this.setState({ loading: false });
            var items = resonse;


            if (items.length > 0) {
                var userObj = { firstName: null, lastName: null, email: this.state.emailinput, inputFirstName: this.state.inputFirstName, inputLastName: this.state.inputLastName, exp: moment().add(7, 'days'), unrecognizedLogin: false };
                this.setState({ firstName: null, lastName: null, email: this.state.emailinput });


                if (this.state.email && this.state.email != '') {
                    localStorage.setItem("userToken", JSON.stringify(userObj));
                    ActivityLog.getStringValue(this.state.emailinput, "login", "Success");
                    history.push('/');
                }
            }
            else {
                this.setState({ status: 2 });
                ActivityLog.getStringValue(this.state.emailinput, "login", "Validation:This email is not registered for this event");
            }
        }).catch((error) => {
            ActivityLog.getStringValue(this.state.emailinput, "login", "Error");
            this.setState({ status: 2 });
            this.setState({ loading: false });
        });
    }
    doLogin = () => {

        ActivityLog.getStringValue(this.state.emailinput, "login", "In progress");
        if (this.validateInput()) {
            if (this.state.unrecognizedLogin == true) {
                var userObj = { firstName: null, lastName: null, email: this.state.emailinput, inputFirstName: this.state.inputFirstName, inputLastName: this.state.inputLastName, exp: moment().add(7, 'days'), unrecognizedLogin: true };
                if (this.state.emailinput && this.state.emailinput != '') {
                    localStorage.setItem("userToken", JSON.stringify(userObj));
                    ActivityLog.getStringValue(this.state.emailinput, "login", "Success");
                    history.push('/');
                }

            } else {
                if (this.state.excelLogin == true) {

                    this.getExcelUserUserInfo();

                } else if (this.state.sqllogin == true) {

                    this.getSQLUserUserInfo();
                }

                else {
                    this.getUserInfo();

                }
            }
        } else {

            ActivityLog.getStringValue(this.state.emailinput, "login", "Failed");
        }

    }

    async sendEmail() {
        this.setState({ btnLoading: true });
        var RegistrationInfo = {
            email: this.state.emailinput,
            firstName: this.state.inputFirstName,
            lastName: this.state.inputLastName,
            country: this.state.country,
            site: this.state.site,
            phoneNumber: this.state.tp,
            role: this.state.role


        };

        var jdata = new FormData();
        var s = JSON.stringify(RegistrationInfo)
        jdata.append("formFile", s);
        /*       formData.append("formFile", this.updateConfigEntry(this.state.configitemslist));*/
        const response = await fetch('Meeting/SendEmail', {
            method: "POST",
            body: jdata

        });

        const finalresult = await response.json().then((r) => {
            this.setState({ btnLoading: false, status: 6 });
            setTimeout(() => { this.setState({ status: 0 }) }, 10000)

            this.setState({ emailinput: '' });

            this.setState({ site: '' });

            this.setState({ role: '' });

            this.setState({ country: '' });

            this.setState({ tp: '' });

            this.setState({ inputFirstName: '' });

            this.setState({ inputLastName: '' });
            this.doClose();

            return true;

        }).catch((error) => {
            return true;
        });


    }


    doSend = () => {
        if (this.validateInput2()) {
            this.sendEmail();



        }


    }

    doClose = () => {

        this.handleCloseModal();
    }
    reRef = () => React.createRef();

    onchangeEmail(e) {
        this.setState({ status: 0 });
        this.setState({ emailinput: e.target.value });

    }
    onchangeSite(e) {
        this.setState({ site: e.target.value });

    }
    onchangeRole(e) {
        this.setState({ role: e.target.value });

    }
    onchangeCountry(e) {
        this.setState({ country: e.target.value });

    }
    onchangeTp(e) {
        this.setState({ tp: e.target.value });

    }
    onchangeFname(e) {
        this.setState({ inputFirstName: e.target.value });

    }
    onchangeLname(e) {
        this.setState({ inputLastName: e.target.value });
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }



    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    validateInput() {





        if (!this.validateEmail(this.state.emailinput)) {
            this.setState({ status: 1 });
            ActivityLog.getStringValue(this.state.emailinput, "login", "Validation:Please enter valid email");
            return false;
        }

        if (this.state.inputFirstName === '') {
            this.setState({ status: 4 });
            ActivityLog.getStringValue(this.state.emailinput, "login", "Validation:Please enter your first name");

            return false;
        }

        if (this.state.inputLastName === '') {
            this.setState({ status: 5 });
            ActivityLog.getStringValue(this.state.emailinput, "login", "Validation:Please enter your last name");

            return false;
        }
        return true;
    }

    validateInput2() {


        this.setState({ status: 0 });


        if (this.state.country === '') {
            this.setState({ status: 7 });
            ActivityLog.getStringValue(this.state.country, "login", "Validation:Please enter your country");
            return false;
        }

        if (this.state.site === '') {
            this.setState({ status: 8 });
            ActivityLog.getStringValue(this.state.site, "login", "Validation:Please enter your site");

            return false;
        }

        if (this.state.role === '') {
            this.setState({ status: 9 });
            ActivityLog.getStringValue(this.state.role, "login", "Validation:Please enter your role");

            return false;
        }
        return true;
    }

    componentDidMount() {
        this.getSettingsv2();
    }






    render() {

        let msg1 = '';
        let msgclick = '';
        let msg2 = '';


        if (this.state.loginRequestMessage.indexOf('>') > 0) {

            if (this.state.loginRequestMessage.split('>').length >= 2) {
                msg1 = this.state.loginRequestMessage.split('>')[0];
                msgclick = this.state.loginRequestMessage.split('>')[1];
                msg2 = this.state.loginRequestMessage.split('>')[2];

            }
           
        }

        return (


            <>
                
                <div id="wrapper" class="wrapper wrapper-login">

                    <main>
                        <div>
                            <Events buttonStatus="false" noDisplayDate="true" />
                            <div className="login-frame">
                                <h1>{this.state.loginFormCaption}</h1>
                                <input id='footer-comment' type="text"
                                    placeholder="* Email" value={this.state.emailinput} onChange={this.onchangeEmail.bind(this)} />
                                <input id='footer-fname' type="text"
                                    placeholder="* FirstName" value={this.state.inputFirstName} onChange={this.onchangeFname.bind(this)} />
                                <input id='footer-lname' type="text"
                                    placeholder="* LastName" value={this.state.inputLastName} onChange={this.onchangeLname.bind(this)} />
                                <button onClick={this.doLogin} className="loginButton"> Login</button>

                            </div>
                            <div className="login-frame-msg">

                                {(this.state.status === 1) && < div className="info-message"> Please enter valid email </div>}


                                {(this.state.status === 2 && !this.state.canLoginRequest) && < div className="info-message"> You are not approved for this event. </div>}

                                {

                                    (this.state.status === 2 && this.state.canLoginRequest) && < div className="info-message info-message-b"> {msg1} <br /> <a className="login-here" onClick={this.handleOpenModal.bind(this)}><b>{msgclick} </b></a><br /> {msg2 }</div>}
                                {(this.state.status === 3) && < div className="info-message"> User redirection is under development  </div>}
                                {(this.state.status === 4) && < div className="info-message"> Please enter your first name  </div>}
                                {(this.state.status === 5) && < div className="info-message"> Please enter your last name  </div>}
                                {(this.state.status === 6) && < div className="info-message info-message-b"> {this.state.loginRequestSuccessMessage} </div>}
                                {(this.state.loading) && < div className="info-message"> Please wait...   </div>}
                            </div>

                        </div>

                        <Modal isOpen={this.state.showModal}>
                            <a onClick={this.doClose} class="close1" />
                            <div className="login-poup">
                            <Events buttonStatus="false" isDate="false" />
                            <div className="login-frame1">
                                <h1>Request</h1>
                                <input id='footer-comment1' type="text"
                                    placeholder="* Email" value={this.state.emailinput} onChange={this.onchangeEmail.bind(this)} />
                                <input id='footer-fname1' type="text"
                                    placeholder="* FirstName" value={this.state.inputFirstName} onChange={this.onchangeFname.bind(this)} />
                                <input id='footer-lname1' type="text"
                                    placeholder="* LastName" value={this.state.inputLastName} onChange={this.onchangeLname.bind(this)} />

                                <input id='footer-lname' type="text"
                                    placeholder="* Country" value={this.state.country} onChange={this.onchangeCountry.bind(this)} />

                                <input id='footer-lname' type="text"
                                    placeholder="* Site" value={this.state.site} onChange={this.onchangeSite.bind(this)} />

                                <input id='footer-lname' type="text"
                                    placeholder="* Role" value={this.state.role} onChange={this.onchangeRole.bind(this)} />

                                <div className="buttonsdiv">
                                    <button onClick={this.doSend} className="loginButton" disabled={this.state.btnLoading}> Submit </button>
                                    <button onClick={this.doClose} className="loginButton"> Close </button> </div>
                                {(this.state.status === 7) && < div className="info-message"> Please enter your city  </div>}
                                {(this.state.status === 8) && < div className="info-message"> Please enter your site  </div>}
                                {(this.state.status === 9) && < div className="info-message"> Please enter your role  </div>}

                                {(this.state.btnLoading) && < div className="info-message"> Please wait...   </div>}
                                    </div>
                            </div>
                        </Modal>
                    </main>

                </div>
                <footer id="footer">

                </footer>

            </>
        );
    }
}
