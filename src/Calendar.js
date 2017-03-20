import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import Views from 'react-big-calendar/lib/Views';
import ThreeDays from './ThreeDays';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class CalendarEvent extends Component{
  get event() {return this.props.event;}
  setHover(elem, event){
    var hoverEvent = new CustomEvent('cal-hover', { 
      detail: {
        el: elem,
        event: event
      },
      bubbles: true
    });
    ReactDOM.findDOMNode(this).dispatchEvent(hoverEvent);
  }
  render(){
    const onMouseEnter = e => this.setHover(this, this.event);
    const onMouseLeave = e => this.setHover(null, null);
    return (
      <div className="fill" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="marker"/>
        <span className="event-title">{this.event.title}</span>
      </div>
    );
  }
}

let formats = {
  dayFormat: (date, culture, localizer) => 
    localizer.format(date, 'ddd DD/M', culture),
}

class Calendar extends Component{
  render(){
    Views['threeDays'] = ThreeDays;
    
    return (<BigCalendar
            className="calendar"
            selectable
            popup
            views={['week', 'threeDays', 'month']}
            messages={{allDay: ""}}
            components={{event: CalendarEvent}}
            formats={formats}
            toolbar={false}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={(slotInfo) => alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}`
            )}
            onView={v=>{}}
            defaultView="week"
            {...this.props}/>);
  }
}
export default Calendar;