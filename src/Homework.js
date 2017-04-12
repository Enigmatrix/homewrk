import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {get} from './util';
import auth from './services/AuthService'
import './App.css';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Homework extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homework: []
        };
    }

    componentDidMount() {
        get('/api/homework', {}, auth.token).then(res => res.json().then(homework => {
            this.setState({homework});
        }));
    }

    render() {
        return (<div {...this.props.style} className="main-content">
            <div className="list-modules">
                {this.state.homework.map(function(hw){
                    return (
                        <Paper className="list-homework">
                        </Paper>);
                })}
            </div>
            <FloatingActionButton className="module-fab" mini={true} secondary={true} onMouseDown={this.addModule}>
                <ContentAdd />
            </FloatingActionButton>
        </div>);
    }
}

export default Homework;