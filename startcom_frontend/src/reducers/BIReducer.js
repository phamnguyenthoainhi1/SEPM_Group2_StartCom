import {
    GET_ALL_BIS,
    GET_BI,
    IS_REGISTERED_SUCCESS,
    RESET_REGISTER,
    UPDATE_BI,
    DELETE_BI,
    LOADING_DATA
} from '../actions/actionTypes';

const initialState = {
    loading: false,
    businessIdea: {},
    businessIdeas: [],
    isRegisteredSuccess: false
};

export default function (state = initialState, action) {
    switch(action.type) {

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };

        case GET_ALL_BIS:
            return {
                ...state,
                businessIdeas: action.payload,
                loading: false
            };

        case GET_BI:
            return {
                ...state,
                businessIdea: action.payload,
            };

        case IS_REGISTERED_SUCCESS:
            return {
                ...state,
                isRegisteredSuccess: action.payload
            };
        case RESET_REGISTER:
            return {
                ...state,
                isRegisteredSuccess: false
            };
        case UPDATE_BI:
            return {
                ...state,
                businessIdea: action.payload
            };
        case DELETE_BI:
            return {
                ...state,

            };

        default:
            return state;                
    }
}
