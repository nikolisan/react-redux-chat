import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessage';

export default function (ComposedComponent) {
    class Authenticate extends Component {
        componentWillMount() {
            if (!this.props.auth.isAuthenticated) {
                this.props.addFlashMessage("You need to be logged in to see this page.", false)
                this.props.history.push('/login')
            }
        }
        
        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }
    }

    Authenticate.propTypes = {
        auth: PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => ({
        auth: state.auth,
        flash: state.flash
    })

    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}


