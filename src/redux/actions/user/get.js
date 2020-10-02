import { UserActionsTypes } from '../../actions-types/UserActionsTypes';

export const setCurrentUser = (user) => ({
  type: UserActionsTypes.SET_CURRENT_USER,
  payload: user
});
