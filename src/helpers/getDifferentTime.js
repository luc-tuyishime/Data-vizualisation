import moment from 'moment';

const time = moment().toDate();

const today = new Date();
const yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24);
const hourago = new Date(today.getTime() - 1000 * 60 * 60);

export const yesterdayUnix = moment(yesterday).unix();
export const houragoUnix = moment(hourago).unix();

// export const startDate = moment().subtract(1, "days").unix();
export const endDate = moment().unix();

export const yesterdayStart = moment().subtract(2, 'days').unix();
export const yesterdayEnd = moment().subtract(1, 'days').unix();

export const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    minHeight: 35
  })
};

time.setHours(0);
time.setMinutes(0);
time.setSeconds(0);
time.setMilliseconds(0);
export const startDate = time / 1000;
