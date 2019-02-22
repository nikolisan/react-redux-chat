import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userLoginToSocket, receive, sendUsername, disconnect, setLoaded, emit } from '../actions/socketAction';

import Messages from './Messages'

class Chatroom extends Component {
    constructor(props) {
        super(props)
        this.handleSend = this.handleSend.bind(this)
    }
    componentDidMount() {
        console.log('---Chatroom did mount')
        // console.log('socket.isConnected: ' + this.props.socket.isConnected)
        // console.log('socket.isConnecting: ' + this.props.socket.isConnecting)
        console.log('isLoaded: ' + this.props.socket.isLoaded)
        // if I remove this if-statement the compoenent re-renders
        // and a new socket is created
        if (!this.props.socket.isLoaded) {
            this.props.userLoginToSocket()
                .then(() => this.props.receive())
                .then(() => this.props.setLoaded(true))
                .then(() => this.props.sendUsername(this.props.auth.user.username))
        }
    }

    componentWillUnmount() {
        // every time a new message is recieved the component willUnmount
        // i want on component will unmount to disconnect from the socket
        console.log('---Chatroom will unmount')
    }

    componentWillReceiveProps(nextProps) {
        console.log('---Component will receive props')
    }

    handleSend() {
        this.props.emit('Hello')
    }

    render() {
        return (
            <div>
                <h1>Chatroom</h1>
                { this.props.socket.isLoaded &&
                    <Messages messages={this.props.messages.messages}/>
                }
                <button onClick={this.handleSend}>Send</button>
            </div>
        );
    }
}

Chatroom.propTypes = {
    socket: PropTypes.object,
    messages: PropTypes.object
}

const mapStateToProps = (state) => {
    return({
        socket: state.socket,
        messages: state.messages
    })
}

export default withRouter(
    connect(mapStateToProps, { userLoginToSocket , receive, sendUsername, disconnect, setLoaded, emit })(Chatroom)
)