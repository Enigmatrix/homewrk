import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import {Link} from 'react-router'

class NoMatch extends Component{
    render(){
        return (<div className="nomatch-bg">
            <div className="nomatch-box">
                <h1 className="nomatch-msg">Oops, we found no such page!</h1>
                <Link to="/">
                    <RaisedButton label="redirect to main page" className="nomatch-redirect-btn"/>
                </Link>
            </div>
        </div>);
    }
}
export default NoMatch;