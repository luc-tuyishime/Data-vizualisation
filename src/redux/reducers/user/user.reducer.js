import { UserActionsTypes } from '../../actions-types/UserActionsTypes';

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case UserActionsTypes.SET_CURRENT_USER_START:
      return {
        ...state,
        user: { ...state.user, loading: true }
      };
    case UserActionsTypes.SET_CURRENT_USER_END:
      return {
        ...state,
        user: { ...state.user, loading: false }
      };
    case UserActionsTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        loading: true
      };

    default:
      return null;
  }
};

export default userReducer;
