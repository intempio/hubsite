import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/login';
import RequireAuth from './hoc/require_auth';

import history from './components/history';
import './css/custom.css'
import './css/style.css'
import { Logout } from './components/logout';
import FileUpload from './components/FileUpload';
import Settings from './components/Settings';
import ViewSettings from './components/ViewSettings';
import PlayVideo from './components/PlayVideo';




export default class App extends Component {
    static displayName = App.name;

    componentWillMount() {

       
    }

    render() {
        return (

            <Router history={history} >
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Layout>

                        <Route exact path='/' component={RequireAuth(Home)} />
                        <Route exact path='/Logout' component={RequireAuth(Logout)} />
                        <Route exact path='/file' component={RequireAuth(FileUpload)} />
                        <Route path='/counter' component={Counter} />
                        <Route path='/settings' component={Settings} />
                        <Route path='/source' component={ViewSettings} />
                        <Route path='/video' component={PlayVideo} />
                    </Layout>
                  

                </Switch>
            </Router>


        );
    }
}
