import React from 'react';
import dates from 'react-big-calendar/lib/utils/dates';
import { navigate } from 'react-big-calendar/lib/utils/constants';

import TimeGrid from 'react-big-calendar/lib/TimeGrid';

let ThreeDays = React.createClass({

  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired,
  },

  getDefaultProps() {
    return TimeGrid.defaultProps
  },

  render() {
    let { date, ...props } = this.props
    let { start, end } = ThreeDays.range(date, this.props)

    return (
      <TimeGrid {...props} start={start} end={end} eventOffset={15} />
    );
  }

});

ThreeDays.navigate = (date, action) => {
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -3, 'day');

    case navigate.NEXT:
      return dates.add(date, 3, 'day')

    default:
      return date;
  }
}

ThreeDays.range = (date, { culture }) => {
  let start = dates.startOf(date, 'day')
  let endDate = dates.add(start, 2, 'day');
  let end = dates.endOf(endDate, 'day')
  return { start, end }
}


export default ThreeDays
