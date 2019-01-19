import { CHANGE_SELECT_DAY, LOAD_NEWS, CHANGE_PAGE } from "../constants/action-types";
import { URL } from './../../Config';

import Model from  '../../model/model';
let model = new Model();
//const URL = "http://www.vgtimes.press/";

const apiMiddleware = store => next => action => {

    if (!action.meta || (action.meta.type !== 'api' && action.meta.type !== 'stack')) {
        return next(action);
    }

    if (action.type === CHANGE_SELECT_DAY) {
        model.getResDay(action.payload.day, action.payload.month, action.payload.year)
        .then( res => {

            //console.log(res);
            // this if's shouldn't be here, it's somenthig I hva to fix in the server
            var gameList = [];
            if (res.type === "resumen") {
                gameList = res.data.map( item => {
                    item.imagen = URL + item.imagen;
                    return item;
                });

                res.data = gameList;
            }
            else {
                gameList = res.data.map( item => {                    
                    item.imagen = item.imagen !== 'no' ? URL + "thumb/thumb_"+item.imagen : item.imagen;
                    return item;
                });

                res.data = gameList;
            }

            let newPayload = Object.assign({}, action.payload, {
                resday: res
            });

            store.dispatch({
                type: action.type,
                payload: newPayload
            });        

        })
        .catch( error => {
            console.log(error);
        });
    }
    else if (action.type === LOAD_NEWS) {

        model.getNewsDay(action.payload.day, action.payload.month, action.payload.year)
        .then( res => {
            //console.log(res);
            let newPayload = Object.assign({}, action.payload, {
                news: res
            });

            store.dispatch({
                type: action.type,
                payload: newPayload
            });

        })
        .catch( error => {
            console.log(error);
        });

    }
    else if (action.type === CHANGE_PAGE) {
        //console.log(store.getState());
        let { stack } = store.getState();
        // console.log(stack);
        //return next(action);

        if (action.payload.status === "add") {
            stack.push({ day: action.payload.day, month: action.payload.month, year: action.payload.year });
            window.location.hash = "f"+action.payload.day+""+action.payload.month+""+action.payload.year;
    
        }
        else if (action.payload.status === "remove") {
            let date = stack.pop();

            if (stack.length > 0) {
                date = stack[stack.length-1];
            }
            else {
                const fdate = new Date();
                date = {
                    day: fdate.getDate(),
                    month: fdate.getMonth()+1,
                    year: fdate.getFullYear()
                };
            }

            model.getNewsDay(date.day, date.month, date.year)
            .then( res => {
                console.log(res);
                let newPayload = {
                    day: date.day,
                    month: date.month,
                    year: date.year,
                    news: res
                };
    
                store.dispatch({
                    type: LOAD_NEWS,
                    payload: newPayload
                });
    
            })
            .catch( error => {
                console.log(error);
            });
        }

        // console.log(stack);
        let newPayload = Object.assign({}, action.payload, {
            stack: stack
        });

        store.dispatch({
            type: action.type,
            payload: newPayload
        });

    }

}

export default apiMiddleware;