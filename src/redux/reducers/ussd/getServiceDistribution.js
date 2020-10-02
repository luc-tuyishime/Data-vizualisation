import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_SERVICE_DISTRIBUTION:
      return {
        ...state,
        listOfServiceDistribution: payload
      };
    default:
      return null;
  }
};
