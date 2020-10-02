import 'dotenv/config';
import { ussdActionsTypes } from '../../actions-types';
import { apiAction } from '../../../helpers';

const { REACT_APP_USSD_BASE_URL } = process.env;

export default (formData) => (dispatch) => dispatch(apiAction({
  method: 'post',
  url: `${REACT_APP_USSD_BASE_URL}/irembo/ussdapp/switchmenus`,
  data: { ...formData },
  onStart: ussdActionsTypes.POST_MENU_START,
  onEnd: ussdActionsTypes.POST_MENU_END,
  onSuccess: ussdActionsTypes.POST_MENU_SUCCESS,
  onFailure: ussdActionsTypes.POST_MENU_FAILURE
}));
