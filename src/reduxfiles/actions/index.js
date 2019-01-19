import { CHANGE_DAY, SELECT_DAY, CHANGE_SELECT_DAY, TOOGLE_RES, LOAD_NEWS, CHANGE_PAGE } from "../constants/action-types";

// TODO: remove this function
export const changeDay = resday => ({
    type: CHANGE_DAY,
    payload: resday
});

// TODO: remove this function
export const selectDay = (day, month, year) => ({
    type: SELECT_DAY,
    payload: {
        day,
        month,
        year
    },
    meta: {
        type: 'api',
    }
});

export const changeSelectDay = (day, month, year, resday) => ({
    type: CHANGE_SELECT_DAY,
    payload: {
        day,
        month,
        year,
        resday
    },
    meta: {
        type: 'api',
    }
});

export const toogleRes = () => ({
    type: TOOGLE_RES,
    payload: {}
});

export const loadNews = (day, month, year, news) => ({
    type: LOAD_NEWS,
    payload: {
        day,
        month,
        year,
        news
    },
    meta: {
        type: 'api'
    }
});

export const changePage = (day, month, year, status) => ({
    type: CHANGE_PAGE,
    payload: {
        day,
        month,
        year,
        status
    },
    meta: {
        type: 'stack'
    }
});
