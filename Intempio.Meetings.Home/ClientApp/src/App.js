import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
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
import PDFViewer from './components/PDFViewer';




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
                        <Route path='/settings' component={RequireAuth(Settings)} />
                        <Route path='/source' component={RequireAuth(ViewSettings)} />
                        <Route path='/video' component={RequireAuth(PlayVideo)} />
                        <Route path='/pdf' component={RequireAuth(PDFViewer)} />
                    </Layout>
                  

                </Switch>
            </Router>


        );
    }
}
