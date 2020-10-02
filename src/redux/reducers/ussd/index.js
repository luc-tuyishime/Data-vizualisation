import { ussd as initialState } from '../../store/initialState';

import requestUptime from './getUptime';
import requestRate from './getRate';
import requestStartTime from './getStartTime';
import requestHeapUsage from './heapUsage';
import requestNonHeapUsage from './nonHeapUsage';
import requestErrors from './getErrors';
import requestDuration from './duration';
import requestMenu from './getMenu';
import postMenu from './postMenu';
import serviceDistribution from './getServiceDistribution';
import performance from './performance';
import requestRateAgent from './getRateAgent';
import requestDurationAgent from './durationAgent';

export default (state = initialState, action) => {
  const get = requestUptime(state, action);
  const getRate = requestRate(state, action);
  const getStartTime = requestStartTime(state, action);
  const getHeapUsage = requestHeapUsage(state, action);
  const getNonHeapUsage = requestNonHeapUsage(state, action);
  const getErrors = requestErrors(state, action);
  const getDuration = requestDuration(state, action);
  const getMenu = requestMenu(state, action);
  const postCardMenu = postMenu(state, action);
  const service = serviceDistribution(state, action);
  const getPerformance = performance(state, action);
  const getRateAgent = requestRateAgent(state, action);
  const getDurationAgent = requestDurationAgent(state, action);

  return (
    get
        || getRate
        || getStartTime
        || getHeapUsage
        || getNonHeapUsage
        || getErrors
        || getDuration
        || getMenu
        || postCardMenu
        || service
        || getPerformance
        || getRateAgent
        || getDurationAgent
        || state
  );
};
