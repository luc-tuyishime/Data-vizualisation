import { message } from 'antd';
import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.POST_MENU_START:
      return {
        ...state,
        postMenu: {
          ...state.postMenu,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.POST_MENU_END:
      return {
        ...state,
        postMenu: {
          ...state.postMenu,
          loading: false
        }
      };
    case ussdActionsTypes.POST_MENU_SUCCESS:
      message.success('Menus successfully saved', 6);
      return {
        ...state,
        postMenu: {
          loading: false,
          message: payload.ack,
          errors: {}
        }
      };
    case ussdActionsTypes.POST_MENU_FAILURE:
      return {
        ...state,
        postMenu: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
