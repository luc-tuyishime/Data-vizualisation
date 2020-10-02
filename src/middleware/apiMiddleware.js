import axiosHelper from "../helpers/axiosHelper";
import { apiActionsTypes } from "../redux/actions-types";

const apiMiddleware = ({ dispatch, getState }) => (next) => async ({
    type = "",
    payload = {}
}) => {
    if (type !== apiActionsTypes.API_REQUEST) {
        return next({ type, payload });
    }
    try {
        dispatch({ type: payload.onStart, payload: { loading: true } });
        const { data } = await axiosHelper(payload.httpOptions)[payload.method](
            payload.url,
            payload.data
        );
        if (typeof payload.onSuccess === "function") {
            payload.onSuccess(data)(dispatch);
        } else {
            dispatch({ type: payload.onSuccess, payload: data });
        }
    } catch (error) {
        dispatch({
            type: payload.onFailure,
            payload: (error.response && error.response.data) || {
                errors: { message: error.message }
            }
        });
    }

    if (typeof payload.onEnd === "function") {
        payload.onEnd({ loading: false })(dispatch);
    } else {
        dispatch({ type: payload.onEnd, payload: { loading: false } });
    }
    return getState();
};

export default apiMiddleware;

// okokokok
