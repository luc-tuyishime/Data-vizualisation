import moment from 'moment';
import { ussdActionsTypes } from '../../actions-types';
import { apiAction } from '../../../helpers';

const { REACT_APP_PROMETHEUS_UPTIME_QUERY } = process.env;

const getUptime = (startDate, endDate = moment().unix()) => (dispatch) => dispatch(apiAction({
  method: 'get',
  url: `/query_range?query=${REACT_APP_PROMETHEUS_UPTIME_QUERY}&start=${startDate}&end=${endDate}&step=1m`,
  onStart: ussdActionsTypes.GET_UPTIME_START,
  onEnd: (data) => (dispatchAction) => {
    getUptime(startDate)(dispatch);
    dispatchAction({
      type: ussdActionsTypes.GET_UPTIME_END,
      payload: data
    });
  },
  onSuccess: ussdActionsTypes.GET_UPTIME_SUCCESS,
  onFailure: ussdActionsTypes.GET_UPTIME_FAILURE
}));

export default getUptime;
