import { combineReducers } from 'redux'

import {
    SELECT_FEATURE,
    REQUEST_FEATURES,
    RECEIVE_FEATURES,
    RECEIVE_ERROR
} from '../actions';

const currentFeature = (state = '', action) => {
    switch (action.type) {
        case SELECT_FEATURE:
            return action.currentFeature
        default:
            return state
    }
};

const features = (state = { isFetching: false, features: [], error: null }, action) => {
    switch (action.type) {
        case REQUEST_FEATURES: 
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_FEATURES: 
            return {
                ...state,
                isFetching: false,
                features: action.features
            };
        case RECEIVE_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state
    }
};

export default combineReducers({ currentFeature, features });