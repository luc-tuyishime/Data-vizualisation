import { ussdActionsTypes } from '../../actions-types';

export default (data) => (dispatch) => dispatch({ type: ussdActionsTypes.GET_MENU_SUCCESS, payload: data });
