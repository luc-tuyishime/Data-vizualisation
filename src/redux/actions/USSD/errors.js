import 'dotenv/config';
import moment from 'moment';
import { ussdActionsTypes } from '../../actions-types';
import { apiAction } from '../../../helpers';

const { REACT_APP_PROMETHEUS_ERRORS_GRAPH_QUERY } = process.env;

const errors = (startDate, endDate = moment().unix()) => (dispatch) => dispatch(apiAction({
  method: 'get',
  url: `/query_range?query=${REACT_APP_PROMETHEUS_ERRORS_GRAPH_QUERY}&start=${startDate}&end=${endDate}&step=1m`,
  onStart: ussdActionsTypes.GET_ERROR_START,
  onEnd: (data) => (dispatchAction) => {
    const timer = setTimeout(() => {
      errors(startDate)(dispatch);
      dispatchAction({
        type: ussdActionsTypes.GET_ERROR_END,
        payload: data
      });
    }, 6000);

    return () => clearTimeout(timer);
  },
  onSuccess: ussdActionsTypes.GET_ERROR_SUCCESS,
  onFailure: ussdActionsTypes.GET_ERROR_FAILURE
}));

export default errors;
