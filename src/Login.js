import React, {Component} from 'react';
import auth from './services/AuthService';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import AlertIcon from 'material-ui/svg-icons/alert/warning';
import {Link} from 'react-router'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            messageOpen: false,
            user: undefined,
            password: undefined,
            message: undefined
        }
    }
    login(e){
        e.preventDefault();
        const {location, router} = this.props;
        auth.login(this.refs.username.value, this.refs.password.value, msg => {
            if(msg.success){
                router.replace(location.state && location.state.nextPathname ?
                    location.state.nextPathname : '/');
            }
            else{
                this.setState({
                    messageOpen: true,
                    message: 'Authentication Failed!'
                });
            }
        });
    }
    render(){
        return (
            <div className="login-bg">
            <AppBar className="header login-app-bar" title="Homewrk"
                showMenuIconButton={false}>

            </AppBar>
            <Paper className="login-panel" rounded={false}>
                <form className="login-form" onSubmit={this.login.bind(this)}>
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
                    <div>
                        <RaisedButton type="submit" label="Login"
                            primary={true}/>
                        <Link to='/register'>
                            <FlatButton label="Register"
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
export default Login;