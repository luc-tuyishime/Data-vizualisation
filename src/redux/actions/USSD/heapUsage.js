import moment from 'moment';
import { ussdActionsTypes } from '../../actions-types';
import { apiAction } from '../../../helpers';

const { REACT_APP_PROMETHEUS_HEAP_USED_GRAPH_QUERY } = process.env;

const heapUsage = (startDate, endDate = moment().unix()) => (dispatch) => dispatch(apiAction({
  method: 'get',
  url: `/query_range?query=${REACT_APP_PROMETHEUS_HEAP_USED_GRAPH_QUERY}&start=${startDate}&end=${endDate}&step=1m`,
  onStart: ussdActionsTypes.GET_HEAP_USAGE_START,
  onEnd: (data) => (dispatchAction) => {
    heapUsage(startDate)(dispatch);
    dispatchAction({
      type: ussdActionsTypes.GET_HEAP_USAGE_END,
      payload: data
    });
  },
  onSuccess: ussdActionsTypes.GET_HEAP_USAGE_SUCCESS,
  onFailure: ussdActionsTypes.GET_HEAP_USAGE_FAILURE
}));

export default heapUsage;
