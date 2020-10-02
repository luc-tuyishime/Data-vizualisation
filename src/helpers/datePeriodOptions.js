import { startDate, endDate, yesterdayEnd } from './getDifferentTime';

const options = [
  {
    value: {
      startDate,
      endDate
    },
    label: 'Today'
  },
  {
    value: {
      startDate: yesterdayEnd,
      endDate
    },
    label: 'Last 24 hour'
  }
];

export default options;
