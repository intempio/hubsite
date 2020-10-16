import React from 'react';
import moment from 'moment';

import history from '../components/history'


const RequireAuth = (ViewComponent) => {
    return class extends React.Component {
        render() {


            let token = localStorage.getItem('userToken')
            token = JSON.parse(token);


            if (token) {
                var a = moment(token.exp);
                var b = moment();
                var diff = a.diff(b, 'days');
                if (diff > 0) {
                    return (
                        <ViewComponent />
                    )
                } else {

                    localStorage.removeItem("userToken")
                    history.push('/');
                    return null;
                }
            } else {
                history.push(`/login`)
                return null;
            }


        }
    }
}

export default RequireAuth;