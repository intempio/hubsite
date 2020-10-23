import React, { Component } from 'react';
import history from './history';
import Events from './events';
import moment from 'moment';
export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', email: '', loading: false, emailinput: '', inputFirstName: '', inputLastName: '', status: '', colour: '#FFFFFF', unrecognizedLogin: false, excelLogin: false };
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
            this.setState({ loading: false, unrecognizedLogin: item.value[0].fields.UnrecognizedLogin, excelLogin: item.value[0].fields.Excellogin });
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

              

                if (this.state.email && this.state.email != '' ) {
                    localStorage.setItem("userToken", JSON.stringify(userObj));
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

            let userobj = items.find(o => o[0] === this.state.emailinput);
            if (userobj != null) {
                var userObj = { firstName: null, lastName: null, email: userobj[0], inputFirstName: this.state.inputFirstName, inputLastName: this.state.inputLastName, exp: moment().add(7, 'days'), unrecognizedLogin: false };
                this.setState({ firstName: null, lastName: null, email: userobj[0] });



                if (this.state.email && this.state.email != '') {
                    localStorage.setItem("userToken", JSON.stringify(userObj));
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
    doLogin = () => {
        if (this.validateInput()) {
            if (this.state.unrecognizedLogin == true) {
                var userObj = { firstName: null, lastName: null, email: this.state.emailinput, inputFirstName: this.state.inputFirstName, inputLastName: this.state.inputLastName, exp: moment().add(7, 'days'), unrecognizedLogin: true };
                if (this.state.emailinput && this.state.emailinput != '') {
                    localStorage.setItem("userToken", JSON.stringify(userObj));
                    history.push('/');
                }

            } else {
                if (this.state.excelLogin == true) {
                    this.getExcelUserUserInfo();

                } else {
                    this.getUserInfo();

                }
            }
        }

    }

    onchangeEmail(e) {
        this.setState({ status: 0 });
        this.setState({ emailinput: e.target.value });
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

    validateInput() {



        if (!this.validateEmail(this.state.emailinput)) {
            this.setState({ status: 1 });
            return false;
        }

        if (this.state.inputFirstName==='') {
            this.setState({ status: 4 });
            return false;
        }

        if (this.state.inputLastName==='') {
            this.setState({ status: 5});
            return false;
        }
        return true;
    }
    
    componentDidMount() {
        this.getSettings();
    }

    render() {
        return (
            <>

                <div id="wrapper" class="wrapper">

                    <main>
                        <div>
                            <Events buttonStatus="false" />
                            <div className="login-frame">
                                <h1>Login</h1>
                                <input id='footer-comment' type="text"
                                    placeholder="* Email" value={this.state.emailinput} onChange={this.onchangeEmail.bind(this)} />
                                <input id='footer-fname' type="text"
                                    placeholder="* FirstName" value={this.state.inputFirstName} onChange={this.onchangeFname.bind(this)} />
                                <input id='footer-lname' type="text"
                                    placeholder="* LastName" value={this.state.inputLastName} onChange={this.onchangeLname.bind(this)} />
                                <button onClick={this.doLogin} className="loginButton"> Login</button>
                                {(this.state.status === 1) && < div className="info-message"> Please enter valid email </div>}
                                {(this.state.status === 2) && < div className="info-message"> This email is not registered for this event </div>}
                                {(this.state.status === 3) && < div className="info-message"> User redirection is under development  </div>}
                                {(this.state.status === 4) && < div className="info-message"> Please enter your first name  </div>}
                                {(this.state.status === 5) && < div className="info-message"> Please enter your last name  </div>}
                                {(this.state.loading) && < div className="info-message"> Please wait...   </div>}
                            </div>
                        </div>
                    </main>
                </div>
                <footer id="footer">

                </footer>
            </>
        );
    }
}
