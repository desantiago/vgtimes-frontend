import { CHANGE_DAY, CHANGE_SELECT_DAY, TOOGLE_RES, LOAD_NEWS } from "../constants/action-types";

const initialState = {
    resday: [],
    visibleRes: true,
    news: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_DAY:
            return { ...state, resday : action.payload };
        case CHANGE_SELECT_DAY:
            return { ...state, resday : action.payload.resday };
        case TOOGLE_RES:
            return { ...state, visibleRes : !state.visibleRes };
        case LOAD_NEWS:
            return { ...state, news : action.payload.news };
        default:
            return state;
    }
};

export default rootReducer;