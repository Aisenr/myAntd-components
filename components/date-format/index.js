import moment from 'moment';
import DateFormat from './DateFormat';
import RangeFormat from './RangeFormat';

DateFormat.RangeFormat = RangeFormat;
DateFormat.format = (value, formatter) => {
  const newFormatter = formatter || 'YYYY-MM-DD HH:mm:ss';
  return moment(new Date(value)).format(newFormatter);
};

export default DateFormat;
