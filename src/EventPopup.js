import moment from 'moment';
import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

class EventPopup extends Component{
  formatTimeRange(start, end){
    let days = moment.duration(moment(end).diff(moment(start))).asDays();
    let mstart = moment(start), mend = moment(end);
    if (days < 1){
      return mstart.format('HH:mm A')
       + ' to '
       + mend.format('HH:mm A')
       + ' on ' + mstart.format('D/M/YYYY');
    }
    else if (mstart.format('HH:mm A') === '00:00 AM' && mend.format('HH:mm A') === '00:00 AM'){
      return mstart.format('D/M/YYYY') + ' to ' + mend.format('D/M/YYYY');
    }
    else{
      return mstart.format('HH:mm A, D/M/YYYY') + ' to ' + mend.format('HH:mm A, D/M/YYYY');
    }
  }
    render(){
        return (
            <div className="event-popup">
              <div className="event-popup-title">
                {this.props.event.title}
              </div>
              <div className="event-popup-timerange">
                {this.formatTimeRange(this.props.event.start, this.props.event.end)}
              </div>
              <div className="event-popup-desc">
                {this.props.event.desc}
              </div>
              <div className="event-popup-actions">
                <FlatButton
                  className="event-popup-action"
                  label="Edit occurence"
                  primary={true}/>
                <FlatButton
                  className="event-popup-action"
                  label="Edit series"
                  primary={true}
                  keyboardFocused={true}/>
              </div>
            </div>);
    }
}
export default EventPopup;