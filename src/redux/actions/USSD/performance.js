import { ussdActionsTypes } from '../../actions-types';

export const performance = (data) => (dispatch) => dispatch({ type: ussdActionsTypes.GET_PERFORMANCE, payload: data });
