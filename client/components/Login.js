import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { loginUser } from '../actions/authentication';
import FlashMessage from './FlashMessage';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        this.props.loginUser(user);
        
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/chat')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/chat');
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div id="login">
                    <div className="row mt-2">
                        <div className="col-md-6 m-auto">
                        <div className="card card-body pt-4 px-4">
                            <h4 className="text-center mb-3">
                                <i className="fas fa-sign-in-alt" /> Login
                            </h4>
                            <FlashMessage />
                            <form id="loginForm" onSubmit={ this.handleSubmit }>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" name="username" className={classnames('form-control', {'is-invalid': errors.username})} placeholder="Enter username" onChange={ this.handleInputChange } value={ this.state.username } />
                                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" className={classnames('form-control', {'is-invalid': errors.password})} placeholder="Enter password" onChange={ this.handleInputChange } value={ this.state.password }/>
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="custom-control custom-switch mb-3">
                                    <input type="checkbox" className="custom-control-input" id="remember" />
                                    <label className="custom-control-label" htmlFor="remember">Remember Me</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </form>
                            <p className="lead small mt-4">
                                You don't have an account? {<Link to="/register">Register</Link>}
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    flash: PropTypes.object,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    flash: state.flash,
})

export default withRouter(
    connect(mapStateToProps, { loginUser } )(Login)
)