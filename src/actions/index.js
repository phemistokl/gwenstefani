import api from '../api'

export const SELECT_FEATURE = 'SELECT_FEATURE';
export const REQUEST_FEATURES = 'REQUEST_FEATURES';
export const RECEIVE_FEATURES = 'RECEIVE_FEATURES';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const selectFeature = id => ({
        type: SELECT_FEATURE, 
        id 
});

export const requestFeatures = () => ({
    type: REQUEST_FEATURES
});

export const receiveFeatures = data => ({
    type: RECEIVE_FEATURES,
    features: data.data.features
});

export const receiveError = error => ({
    type: RECEIVE_ERROR,
    error,
});

export const fetchFeatures = () => dispatch => {
    dispatch(requestFeatures());

    return api.listFeatures()
        .then(data => dispatch(receiveFeatures(data)))
        .catch(error => dispatch(receiveError(error)));
}