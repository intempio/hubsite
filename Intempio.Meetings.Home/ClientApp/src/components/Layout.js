import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) {

        super(props);
        this.state = { firstName: '', lastName: '', email: 'aa', loading: false };
      
      
    }

    componentDidMount() {

        let token = localStorage.getItem('userToken')
        token = JSON.parse(token);
        if (token) {
            var fname = token.inputFirstName;
            var lname = token.inputLastName;
            if (token.firstName) {
                fname = token.firstName;

            }
            if (token.lastName) {
                lname = token.lastName;
            }
            this.setState({ firstName: fname, lastName: lname });
        }
    }

    render() {
        return (
            <>
             
                <header>
                    <button style={{ display: "none" }}>Log in</button>
                    <div class="vertical-line" style={{ display: "none" }}></div>
                    <div class="notification" style={{ display: "none"}}>
                        <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path
                                    d="M10.3569 23.8491C10.3347 24.7412 11.1017 25.4959 12.0067 25.4881C12.9024 25.4804 13.6509 24.7273 13.6235 23.8491H10.3569Z"
                                    fill="#D7D7D7" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.5801 27.1411C11.4153 27.0982 11.2495 27.0595 11.0862 27.012C9.74322 26.6225 8.82686 25.485 8.69721 24.0521C8.69204 23.9922 8.68791 23.9323 8.68016 23.8352H8.40691H1.51358C0.679867 23.8352 0.234603 23.4876 0.0780885 22.6642C-0.0799752 21.832 -0.00197635 21.0076 0.347727 20.2395C0.499592 19.9063 0.791958 19.6377 1.01924 19.3407C1.03541 19.3201 1.05519 19.3026 1.07761 19.289C2.62725 18.3463 3.24711 16.8339 3.56582 15.1567C3.743 14.2202 3.82409 13.2656 3.99146 12.3265C4.23785 10.9396 4.46978 9.54282 5.05193 8.24577C5.92541 6.29632 7.41307 5.02612 9.43277 4.36288C9.52214 4.33343 9.61253 4.30554 9.70189 4.27506C9.70189 4.27506 10.8293 4 11.9654 4C13.1015 4 14.2289 4.25182 14.2289 4.25182C14.543 4.36443 14.855 4.45844 15.1535 4.58551C17.4486 5.55249 18.8179 7.29945 19.4311 9.68177C19.8257 11.2082 20.0835 12.7573 20.2632 14.3235C20.3743 15.2915 20.6501 16.2259 21.0122 17.1309C21.2811 17.807 21.7318 18.3956 22.3144 18.8314C22.4038 18.8991 22.4916 18.9678 22.581 19.038C23.7546 19.9275 24.251 21.3625 23.878 22.7938C23.6874 23.5191 23.2794 23.8352 22.5267 23.8352H15.3235C15.2718 24.1291 15.2538 24.4142 15.1732 24.6813C14.7728 26.0104 13.8942 26.826 12.5233 27.0956C12.4832 27.1072 12.4443 27.1224 12.4071 27.1411H11.5801ZM12.0067 25.4881C11.1017 25.4959 10.3347 24.7412 10.3569 23.8491H13.6235C13.6509 24.7273 12.9024 25.4804 12.0067 25.4881Z"
                                    fill="#D7D7D7" />
                            </g>
                            <path
                                d="M18 0C14.6809 0 12 2.68085 12 6C12 9.31915 14.6809 12 18 12C21.3191 12 24 9.31915 24 6C24 2.68085 21.2872 0 18 0Z"
                                fill="#67B1E2" />
                            <path
                                d="M17.0859 4.9875H17.8078C18.1516 4.9875 18.4062 4.90156 18.5719 4.72969C18.7375 4.55781 18.8203 4.32969 18.8203 4.04531C18.8203 3.77031 18.7375 3.55625 18.5719 3.40313C18.4094 3.25 18.1844 3.17344 17.8969 3.17344C17.6375 3.17344 17.4203 3.24531 17.2453 3.38906C17.0703 3.52969 16.9828 3.71406 16.9828 3.94219H15.6281C15.6281 3.58594 15.7234 3.26719 15.9141 2.98594C16.1078 2.70156 16.3766 2.47969 16.7203 2.32031C17.0672 2.16094 17.4484 2.08125 17.8641 2.08125C18.5859 2.08125 19.1516 2.25469 19.5609 2.60156C19.9703 2.94531 20.175 3.42031 20.175 4.02656C20.175 4.33906 20.0797 4.62656 19.8891 4.88906C19.6984 5.15156 19.4484 5.35313 19.1391 5.49375C19.5234 5.63125 19.8094 5.8375 19.9969 6.1125C20.1875 6.3875 20.2828 6.7125 20.2828 7.0875C20.2828 7.69375 20.0609 8.17969 19.6172 8.54531C19.1766 8.91094 18.5922 9.09375 17.8641 9.09375C17.1828 9.09375 16.625 8.91406 16.1906 8.55469C15.7594 8.19531 15.5437 7.72031 15.5437 7.12969H16.8984C16.8984 7.38594 16.9937 7.59531 17.1844 7.75781C17.3781 7.92031 17.6156 8.00156 17.8969 8.00156C18.2187 8.00156 18.4703 7.91719 18.6516 7.74844C18.8359 7.57656 18.9281 7.35 18.9281 7.06875C18.9281 6.3875 18.5531 6.04688 17.8031 6.04688H17.0859V4.9875Z"
                                fill="white" />
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="24" height="24" fill="white" transform="translate(0 4)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="vertical-line" style={{ display: "none" }}></div>
                    <div class="user-name">{this.state.firstName} {this.state.lastName}</div>
                    <div class="user-avatar">
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22 0C9.856 0 0 9.856 0 22C0 34.144 9.856 44 22 44C34.144 44 44 34.144 44 22C44 9.856 34.144 0 22 0ZM22 6.6C25.652 6.6 28.6 9.548 28.6 13.2C28.6 16.852 25.652 19.8 22 19.8C18.348 19.8 15.4 16.852 15.4 13.2C15.4 9.548 18.348 6.6 22 6.6ZM22 37.84C16.5 37.84 11.638 35.024 8.8 30.756C8.866 26.378 17.6 23.98 22 23.98C26.378 23.98 35.134 26.378 35.2 30.756C32.362 35.024 27.5 37.84 22 37.84Z"
                                fill="#D7D7D7" />
                        </svg>
                    </div>
                    <NavMenu />
                </header>
                <div id="wrapper" class="wrapper">
               
                    <main>
                        {this.props.children}
                    </main>
                </div>
                <footer id="footer">
                   
</footer>
            </>
        );
    }
}
