import { ussdActionsTypes } from '../../actions-types';

export const serviceDistribution = (data) => (dispatch) => dispatch({ type: ussdActionsTypes.GET_SERVICE_DISTRIBUTION, payload: data });
