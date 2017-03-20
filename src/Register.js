import React, {Component} from 'react';
import auth from './services/AuthService';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import AlertIcon from 'material-ui/svg-icons/alert/warning';
import {Link} from 'react-router'

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            messageOpen: false,
            message: undefined,
            user: undefined,
            userid: undefined,
            email: undefined,
            password: undefined,
            reconfirmPassword: undefined,
        }
    }
    register(e){
        e.preventDefault();
        if(this.refs.password.value !== this.refs.reconfirmPassword.value){
            this.openSnackbar("Passwords do not match")
            return;
        }
        auth.register(this.refs.username.value, this.refs.userid.value, this.refs.email.value, this.refs.password.value,
            msg => {
                if(msg.success){
                    const {router} = this.props;
                    router.replace('/');
                }
                else{
                    this.openSnackbar("Registration failed")
                }
            })
    }
    openSnackbar(txt){
        this.setState({
            messageOpen: true,
            message: txt
        });
    }
    render(){
        return (
            <div className="login-bg">
            <AppBar className="header login-app-bar" title="Homewrk"
                showMenuIconButton={false}/>

            <Paper className="login-panel" rounded={false}>
                <form className="login-form" onSubmit={this.register.bind(this)}>
                    <input
                        ref="userid"
                        className="no-highlight"
                        type="text"
                        placeholder="UserId (hxxxxxxx)"
                        value={this.state.userid}/>
                    <input
                        ref="email"
                        className="no-highlight"
                        type="email"
                        placeholder="Email"
                        value={this.state.email}/>
                    <input
                        ref="username"
                        className="no-highlight"
                        type="text"
                        placeholder="Username"
                        value={this.state.username}/>
                    <input
                        ref="password"
                        className="no-highlight"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}/>
                    <input
                        ref="reconfirmPassword"
                        className="no-highlight"
                        type="password"
                        placeholder="Confirm Password"
                        value={this.state.reconfirmPassword}/>
                    <div>
                        <RaisedButton type="submit" label="Register"
                            primary={true}/>
                            
                        <Link to='/login'>
                            <FlatButton label="Cancel"
                                primary={true}/>
                        </Link>
                    </div>
                </form>
            </Paper>
                <Snackbar
                    open={this.state.messageOpen}
                    className="alert-snackbar"
                    message={<div className="horizontal-layout">
                        <div className="flex-fill"/>
                        <AlertIcon className="alert"/>
                        <span>{this.state.message}</span>
                        <div className="flex-fill"/>
                    </div>}
                    autoHideDuration={1000}/>
            </div>  
        );
    }
}
export default Register;