import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import Popover from 'material-ui/Popover';
import './App.css';
import Calendar from './Calendar';
import EventPopup from './EventPopup';
import MediaQuery from 'react-responsive'
import {debounce, get} from './util';
import auth from './services/AuthService';
import moment from 'moment';

let addDays = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

let events = [];

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      events: [],
      popoverOpen: false,
      hoveredEvent: this.defaultHoverEvent,
      anchorEl: null,
      calendarMode: 'week',
        next: undefined,
        prev: undefined
    };
  }
  defaultHoverEvent = {title: '', start: new Date(0,0,0), end: new Date(0,0,0)}
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
  isMouseOverPopup = false
  eventPopupMouseEnter(){
    this.isMouseOverPopup = true;
  }
  eventPopupMouseLeave(){
    this.isMouseOverPopup = false;
    this.setState({
      popoverOpen: false,
      anchorEl: null,
      hoveredEvent: this.defaultHoverEvent
    });
  }
    setWeek(date){

        let start = moment(date).startOf('week'), end = moment(date).endOf('week');

        get('/api/schedule',
            {start: start.format("YYYY-MM-DD"),
                end: end.format("YYYY-MM-DD")},
            auth.token).then(res => res.json().then(schedule => {
            console.log(schedule);
            schedule.slots.map(slot => {
                let deltaS = moment(slot.date);
                if(slot.repeatMode === "weekly"){
                    deltaS = start.clone().add(moment.duration(moment(slot.date).days(), "days"));
                }
                slot.start = deltaS.clone().add(moment.duration(slot.start_time)).toDate();
                slot.end = deltaS.clone().add(moment.duration(slot.end_time)).toDate();

                slot.title = slot.name;
                slot.desc = slot.description;
            });
            this.setState({events: schedule.slots, currentDate:date});
        }));
    }
    nextWeek(){
        console.log("next");
        this.setWeek(moment(this.state.currentDate).add(1, "week").toDate());
    }
    prevWeek(){
        this.setWeek(moment(this.state.currentDate).add(-1, "week").toDate());
    }
  componentDidMount() {
    //rate limit this
    let fn = debounce(e => {
      let isNotLeavingEvent = e.detail.el != null;
        if(this.isMouseOverPopup)return;
        this.setState({
          popoverOpen: isNotLeavingEvent,
          anchorEl: ReactDOM.findDOMNode(e.detail.el),
          hoveredEvent: e.detail.event || this.defaultHoverEvent
      });
    }, 100);

    this.setWeek(new Date());

    ReactDOM.findDOMNode(this.refs.cal).addEventListener("cal-hover", fn);

    var mql = window.matchMedia("(min-width: 480px)");
    let handleMediaChange = ({matches}) => this.setState({calendarMode: matches ? 'week' : 'threeDays' });
    mql.addListener(handleMediaChange);
    handleMediaChange(mql);

    this.props.parent.setState({fwd: this.nextWeek.bind(this), bwd: this.prevWeek.bind(this)});
  }
  handleCalendarModeChange = (event, index, value) => this.setState({calendarMode: value});
  render() {
    return (
        <div {...this.props.style} className="main-content">
          <Calendar ref="cal"
            scrollToTime={new Date(0, 0, 0, 8, 0, 0)}
            defaultDate={this.state.currentDate}
            date={this.state.currentDate}
            events={this.state.events}
            view={this.state.calendarMode}/>
            
          <Popover
            open={this.state.popoverOpen}
            anchorEl={this.state.anchorEl}
            useLayerForClickAway={false}
            anchorOrigin={{horizontal: 'right', vertical: 'center'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={() => this.setState({popoverOpen: false})}>
            <div
              onMouseEnter={this.eventPopupMouseEnter.bind(this)}
              onMouseLeave={this.eventPopupMouseLeave.bind(this)}>
              <EventPopup event={this.state.hoveredEvent}/>
            </div>
          </Popover>
        </div>
    );
  }
}

export default Schedule;
