import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {get} from './util';
import auth from './services/AuthService'
import './App.css';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Modules extends Component{
    constructor(props){
        super(props);
        this.state = {
            modules: []
        };
    }
    componentDidMount(){
        get('/api/modules', {}, auth.token).then(res => res.json().then(modules => {
            this.setState({modules});
        }));
    }
    addModule(){
    }
    render(){
        console.log(this.state);
        return (<div {...this.props.style} className="main-content">
            <div className="list-modules">
                {this.state.modules.map(function(module){
                    return (
                        <Paper className="list-module">
                            <div>
                                <h1 className="list-module-name">{module.name}, </h1>
                                <h2 className="list-module-code">{module.moduleCode}</h2>
                                <h4 className="list-module-desc">{module.description}</h4>
                            </div>
                            <div className="list-module-space"/>
                            <IconButton className="list-module-btn">
                                <EditIcon/>
                            </IconButton>
                        </Paper>);
                })}
            </div>
            <FloatingActionButton className="module-fab" mini={true} secondary={true} onMouseDown={this.addModule}>
                <ContentAdd />
            </FloatingActionButton>
        </div>);
    }
}

export default Modules;