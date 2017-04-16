import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {get} from './util';
import auth from './services/AuthService'
import './App.css';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import SvgIcon from 'material-ui/svg-icons/';
import {Menu, MenuItem, RaisedButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import Badge from 'material-ui/Badge';
import DoneIcon from 'material-ui/svg-icons/action/done';
import UndoneIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import InProgressIcon from 'material-ui/svg-icons/action/restore';

class Homework extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homework: [],
            showLess: true
        };
    }

    componentDidMount() {
        this.submitQuery();
    }

    toggleShowLess(){
        this.setState(old => { return {showLess: !old.showLess};});
    }

    submitQuery(nameQuery, startDate, endDate){
        get('/api/homework', {nameQuery, startDate, endDate}, auth.token).then(res => res.json().then(homework => {
            this.setState({homework});
        }));
    }

    callSubmitQuery(){
        this.submitQuery(
            this.getRef('search', s => s.input.value),
            this.getRef('startDate', d => d.state.date ? moment(d.state.date).format('YYYY-MM-DD') : undefined),
            this.getRef('endDate', d => d.state.date ? moment(d.state.date).format('YYYY-MM-DD') : undefined));
    }

    getRef(ref, getPath){
        return this.refs[ref] === undefined ? undefined : getPath(this.refs[ref]);
    }

    render() {
        return (<div {...this.props.style} className="main-content">
            <div className="list-homeworks">

                <div className="searchfieldset">
                    <div className="searchfield">
                        <TextField ref="search" className="search" hintText="Search..."/>
                        <IconButton onClick={this.toggleShowLess.bind(this)}>
                            <MoreVertIcon color={blue500}/>
                        </IconButton>
                        <RaisedButton style={{height:48}} onClick={this.callSubmitQuery.bind(this)} label="SEARCH"/>
                    </div>
                    {
                        this.state.showLess ? null :
                        <div className="datefields">
                            <DatePicker className="dates" ref="startDate"
                                        floatingLabelText="Start Date"/>
                            <DatePicker className="dates" ref="endDate"
                                        floatingLabelText="End Date"/>
                        </div>
                    }
                </div>
                {this.state.homework.map(function(hw){
                    return (
                        <Paper className="list-homework">

                            <div className="list-homework-status">
                                <UndoneIcon style={{color: 'white'}}/>
                                <div> {hw.unstarted} |  </div>
                                <InProgressIcon style={{color: '#18FFFF'}}/>
                                <div style={{color: '#18FFFF'}}> {hw.inProgress} |  </div>
                                <DoneIcon style={{color: '#CDDC39'}}/>
                                <div style={{color: '#CDDC39'}}> {hw.done}</div>
                            </div>

                            <div className="list-homework-box1" style={{padding: 10}}>
                                <div className="list-homework-name">{hw.name}</div>
                                <div className="list-homework-earliest-deadline">{moment(hw.earliestDeadline).format("MMMM Do, h:mm:ss a")}</div>
                                <div className="list-homework-desc">{hw.description}</div>
                            </div>
                            <div className="list-homework-space"></div>
                            {
                                hw.mCode === null ? null :
                                <div className="list-homework-module" style={{padding:10}}>
                                    <div><b>{hw.mCode}</b>, {hw.weightage}%</div>
                                    {hw.userScore !== null ?
                                        <div>{hw.userScore}/{hw.maxScore}</div> : null}
                                </div>
                            }
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