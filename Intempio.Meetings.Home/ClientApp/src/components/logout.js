import React, { Component } from 'react';
import history from './history';

export class Logout extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.doLogout();
    }
    doLogout = () => {


        localStorage.removeItem("userToken")

        history.push('/');
    }
    render() {
        return (
            <div>
                <h1>Login</h1>

                <button onClick={this.doLogout}> Logout</button>

            </div>
        );
    }
}
