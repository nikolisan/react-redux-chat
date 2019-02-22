import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import { addFlashMessage } from '../actions/flashMessage';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirm: '',
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
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        console.log(user);
        this.props.registerUser(user, this.props.history);
        this.props.addFlashMessage("Registered successfully. Please log in.", true)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row mt-2">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body">
                            <h4 className="text-center mb-3">
                                <i className="fas fa-user-plus" /> Register
                            </h4>
                            <form onSubmit={ this.handleSubmit }>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" name="username" className={classnames("form-control", {'is-invalid': errors.username})} placeholder="Enter Name" onChange={ this.handleInputChange } value={ this.state.username } />
                                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" className={classnames("form-control", {'is-invalid': errors.email})} placeholder="Enter Email" onChange={ this.handleInputChange } value={ this.state.email } />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" className={classnames("form-control", {'is-invalid': errors.password})} placeholder="Enter Password" onChange={ this.handleInputChange } value={ this.state.password } />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password_confirm">Confirm Password</label>
                                    <input type="password" id="password_confirm" name="password_confirm" className={classnames("form-control", {'is-invalid': errors.password_confirm})} placeholder="Confirm Password" onChange={ this.handleInputChange } value={ this.state.password_confirm } />
                                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Register
                                </button>
                            </form>
                            <p className="small mt-4">Do you have an account? {<Link to="/login">Login</Link>}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    flash: state.flash
});

export default connect(mapStateToProps, { registerUser, addFlashMessage })(withRouter(Register))


