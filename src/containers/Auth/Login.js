import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: ''
        };
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value); 
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value);
    }

    handleLogin = async () => {
        // console.log('username: ', this.state.username, 'password: ', this.state.password);
        // console.log('All state: ', this.state);
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            // console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            } else if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('Login success')
            }

        } catch (err) {
            if (err.response) {
                if (err.response.data) {
                    this.setState({
                        errorMessage: err.response.data.message
                    })
                }
            }
            // console.log(error);

        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='from-login'>
                <div className='login-container'>
                    <div className='login-content'>
                        <h2 className='headerTitle'>Login</h2>
                        <div className='form-group row'>
                            <label>Username</label>
                            <input type='text'
                                placeholder="Enter your username"
                                className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}></input>
                        </div>
                        <div className='form-group row form-password'>
                            <label>Password</label>
                            <div class="input-container">
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    class="form-control"
                                    onChange={(event) => this.handleOnChangePassword(event)}></input>
                                <span onClick={() => this.handleShowHidePassword()}><i class={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                            </div>
                        </div>
                        <div className='message'>
                            {this.state.errorMessage}
                        </div>
                        <div className='form-group row'>
                            <button onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='form-group' id="center">
                            <span>Forgot your password?</span>
                        </div>
                        <div id="alternativeLogin">
                            <label>Or Login with:</label>
                            <div className='col-12 social-login mt-2'>
                                <i class="fab fa-google-plus-g google"></i>
                                <i class="fab fa-facebook-f face"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
