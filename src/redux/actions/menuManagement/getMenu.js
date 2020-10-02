import 'dotenv/config';
import { ussdActionsTypes } from '../../actions-types';
import { apiAction } from '../../../helpers';

const { REACT_APP_USSD_BASE_URL } = process.env;

export default () => (dispatch) => dispatch(apiAction({
  method: 'get',
  url: `${REACT_APP_USSD_BASE_URL}/irembo/ussdapp/switchmenus`,
  onStart: ussdActionsTypes.GET_MENU_START,
  onEnd: ussdActionsTypes.GET_MENU_END,
  onSuccess: ussdActionsTypes.GET_MENU_SUCCESS,
  onFailure: ussdActionsTypes.GET_MENU_FAILURE
}));
