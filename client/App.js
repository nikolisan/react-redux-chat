import React, { Component } from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Home from './components/Home';
import Chatroom from './components/Chatroom';
import requireAuth from './components/requireAuth';

import { connect } from 'react-redux';
import _ from 'lodash';
import isEmpty from './isEmpty';
import { userLoginToSocket } from './actions/socketAction';

class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     socket: {}
        // }
    }

    componentDidMount() {
        // this.props.userLoginToSocket()
    }

    componentWillReceiveProps(nextProps){

    }
    
    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/chat' component={requireAuth(Chatroom)}/>
                </Switch>

            </div>
        );
    }
}

App.propTypes = {
    
};

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(
    connect(mapStateToProps, { userLoginToSocket })(App)
)