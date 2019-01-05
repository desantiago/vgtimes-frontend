import { CHANGE_DAY, CHANGE_SELECT_DAY, TOOGLE_RES, LOAD_NEWS } from "../constants/action-types";

const initialState = {
    resday: [],
    resdayDate: {},
    visibleRes: true,
    news: [],
    newsDate: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_DAY:
            return { ...state, resday : action.payload };
        case CHANGE_SELECT_DAY:
            return { ...state, resday : action.payload.resday, resdayDate: { day: action.payload.day, month: action.payload.month, year: action.payload.year } };
        case TOOGLE_RES:
            return { ...state, visibleRes : !state.visibleRes };
        case LOAD_NEWS:
            return { ...state, news : action.payload.news, newsDate: { day: action.payload.day, month: action.payload.month, year: action.payload.year } };
        default:
            return state;
    }
};

export default rootReducer;