import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import ArrowFwdIcon from 'material-ui/svg-icons/navigation/chevron-right';
import ArrowBwdIcon from 'material-ui/svg-icons/navigation/chevron-left';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import './App.css';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MediaQuery from 'react-responsive';
import {
  Link
} from 'react-router';
import auth from './services/AuthService';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {bwd:undefined, fwd:undefined};
    }
  logout(){
      auth.logout(() => {
          this.context.router.push('/login');
      })
  }
  static contextTypes = {
      router: PropTypes.object.isRequired,
      fwd: PropTypes.func,
      bwd: PropTypes.func
  }
  withParent(obj){
      obj.props.parent = this;
      return obj;
  }
  render() {
    return (
        <div className="App">
          <AppBar className="header"
            title={
              <div className="vertical-layout">
                <Badge className="homework-badge"
                  badgeContent={4}
                  badgeStyle={{
                    width: 16,
                    height: 16,
                    top: 7}}
                  secondary={true}>
                  <span>Homewrk</span>
                </Badge>
                <MediaQuery minDeviceWidth={480}>
                 <Link to="/">
                    <FlatButton className="link-btn" label="schedule" onClick={this.navHomework}/>
                  </Link>
                  <Link to="/homework">
                    <FlatButton className="link-btn" label="homework" onClick={this.navHomework}/>
                  </Link>
                  <Link to="/modules">
                    <FlatButton className="link-btn" label="modules"/>
                  </Link>
                </MediaQuery>
              </div>}
            iconElementLeft={
                <div className="vertical-layout">
                    <IconButton className="btn">
                    <ArrowBwdIcon color='white'
                        onClick={this.state.bwd}/>
                    </IconButton>
                    <IconButton className="btn">
                        <ArrowFwdIcon color='white'
                        onClick={this.state.fwd}/>
                    </IconButton>
                    </div>}
            iconElementRight={
              <div className="vertical-layout">
                <FlatButton className="action-btn" label="today"/>
                
                <IconMenu
                  iconButtonElement={<IconButton className="btn">
                  <AccountCircleIcon color='white'/>
                </IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                  <MenuItem primaryText="Refresh" />
                  <MenuItem primaryText="Profile" />
                  <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)}/>
                </IconMenu>
              </div>}/>
              
                {this.withParent(this.props.children)}
            </div>
    );
  }
}

export default App;
