import { user as initialState } from '../../store/initialState';

import user from './user.reducer';

export default (state = initialState, action) => {
  const get = user(state, action);

  return get || state;
};
