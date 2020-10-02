import 'dotenv/config';
import moment from 'moment';
import { ussdActionsTypes } from '../../actions-types';
import { apiAction } from '../../../helpers';

const { REACT_APP_PROMETHEUS_DURATION_GRAPH_QUERY } = process.env;

let shouldUpdateEndDate = true;
let timer = null;

const durationAgent = (startDate, endDate = moment().unix(), updateEndDate = true) => (dispatch) => dispatch(apiAction({
  method: 'get',
  url: `/query_range?query=${REACT_APP_PROMETHEUS_DURATION_GRAPH_QUERY}&start=${startDate}&end=${endDate}&step=1m`,
  onStart: ussdActionsTypes.GET_DURATION_AGENT_START,
  onEnd: (data) => (dispatchAction) => {
    clearTimeout(timer);
    shouldUpdateEndDate = updateEndDate;
    if (updateEndDate && shouldUpdateEndDate) {
      timer = setTimeout(() => {
        durationAgent(startDate)(dispatch);

        dispatchAction({
          type: ussdActionsTypes.GET_DURATION_AGENT_END,
          payload: data
        });
      }, 6000);
    }
  },
  onSuccess: ussdActionsTypes.GET_DURATION_AGENT_SUCCESS,
  onFailure: ussdActionsTypes.GET_DURATION_AGENT_FAILURE
}));

export default durationAgent;
