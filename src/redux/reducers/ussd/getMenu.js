import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_MENU_START:
      return {
        ...state,
        fetchMenu: {
          ...state.fetchMenu,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_MENU_END:
      return {
        ...state,
        fetchMenu: {
          ...state.fetchMenu,
          loading: false
        }
      };
    case ussdActionsTypes.GET_MENU_SUCCESS:
      return {
        ...state,
        listOfMenu: payload,
        fetchMenu: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_MENU_FAILURE:
      return {
        ...state,
        fetchMenu: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
