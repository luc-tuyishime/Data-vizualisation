import moment from 'moment';
import { ussdActionsTypes } from '../../actions-types';
import { apiAction } from '../../../helpers';

const { REACT_APP_PROMETHEUS_START_TIME_QUERY } = process.env;

const getStartTime = (startDate, endDate = moment().unix()) => (dispatch) => dispatch(apiAction({
  method: 'get',
  url: `/query_range?query=${REACT_APP_PROMETHEUS_START_TIME_QUERY}&start=${startDate}&end=${endDate}&step=1m`,
  onStart: ussdActionsTypes.GET_START_TIME_START,
  onEnd: (data) => (dispatchAction) => {
    getStartTime(startDate)(dispatch);
    dispatchAction({
      type: ussdActionsTypes.GET_START_TIME_END,
      payload: data
    });
  },
  onSuccess: ussdActionsTypes.GET_START_TIME_SUCCESS,
  onFailure: ussdActionsTypes.GET_START_TIME_FAILURE
}));

export default getStartTime;
