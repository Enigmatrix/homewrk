import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import Popover from 'material-ui/Popover';
import './App.css';
import events from './events';
import Calendar from './Calendar';
import EventPopup from './EventPopup';
import MediaQuery from 'react-responsive'
import {debounce} from './util';

let addDays = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(2015, 3, 12),
      events: events,
      popoverOpen: false,
      hoveredEvent: this.defaultHoverEvent,
      anchorEl: null,
      calendarMode: 'week'
    };
  }
  defaultHoverEvent = {title: '', start: new Date(0,0,0), end: new Date(0,0,0)}
  fwd() {
    this.setState(prevState => ({
      currentDate: addDays(prevState.currentDate, 7)
    }));
  }
  bwd() {
    this.setState(prevState => ({
      currentDate: addDays(prevState.currentDate, -7)
    }));
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
    ReactDOM.findDOMNode(this.refs.cal).addEventListener("cal-hover", fn);

    var mql = window.matchMedia("(min-width: 480px)");

    let handleMediaChange = ({matches}) => this.setState({calendarMode: matches ? 'week' : 'threeDays' });

    mql.addListener(handleMediaChange);
    handleMediaChange(mql);

  }
  handleCalendarModeChange = (event, index, value) => this.setState({calendarMode: value});
  render() {
    return (
        <div {...this.props.style} className="main-content">
          <Calendar ref="cal"
            scrollToTime={new Date(0, 0, 0, 8, 0, 0)}
            defaultDate={this.state.currentDate}
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
