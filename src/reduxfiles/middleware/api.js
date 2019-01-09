import { CHANGE_SELECT_DAY, LOAD_NEWS, CHANGE_PAGE } from "../constants/action-types";

import Model from  '../../model/model';
let model = new Model();
const URL = "http://172.16.100.25:8125/";

const apiMiddleware = store => next => action => {

    if (!action.meta || (action.meta.type !== 'api' && action.meta.type !== 'stack')) {
        return next(action);
    }

    if (action.type === CHANGE_SELECT_DAY) {
        model.getResDay(action.payload.day, action.payload.month, action.payload.year)
        .then( res => {

            //console.log(res);
            if (res.type === "resumen") {
                var gameList = res.data.map( item => {
                    item.imagen = URL + item.imagen;
                    return item;
                });

                res.data = gameList;
            }
            else {
                var gameList = res.data.map( item => {                    
                    item.imagen = item.imagen !== 'no' ? URL + "thumb/thumb_"+item.imagen : item.imagen;
                    return item;
                });

                res.data = gameList;
            }

            //this.props.changeDay(gameList);
            /*
            store.dispatch({
                type : "CHANGE_DAY",
                payload : gameList
            });
            */

            /*
            store.dispatch({
                type: action.type,
                payload: {
                    day: action.payload.day,
                    month: action.payload.month,
                    year: action.payload.year,
                    resday: gameList
                }
            });
            */

            let newPayload = Object.assign({}, action.payload, {
                resday: res
            });

            store.dispatch({
                type: action.type,
                payload: newPayload
            });        

            /*
            let newPayload = Object.assign({}, action.payload, {
                resday: gameList
            });

            let newAction = Object.assign({}, action, {
                payload : newPayload
            });

            console.log(newAction);
            store.dispatch(newAction);
            */
        })
        .catch( error => {
            alert(error);
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
        console.log("Cambiar stack");
        //console.log(store.getState());
        let { stack } = store.getState();
        console.log(stack);
        //return next(action);

        if (action.payload.status === "add") {
            stack.push({ day: action.payload.day, month: action.payload.month, year: action.payload.year });
            window.location.hash = "f"+action.payload.day+""+action.payload.month+""+action.payload.year;
    
        }
        else if (action.payload.status === "remove") {
            let date = stack.pop();

            if (stack.length > 0) {
                date = stack[stack.length-1];
                console.log("Dia que hay que recargar", date);
            }
            else {
                const fdate = new Date();
                date = {
                    day: fdate.getDate(),
                    month: fdate.getMonth()+1,
                    year: fdate.getFullYear()
                };
                console.log("Dia que hay que recargar", date);
            }
            //if 
            //window.location.hash = "f"+date.day+""+date.month+""+date.year;

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

        console.log(stack);
        let newPayload = Object.assign({}, action.payload, {
            stack: stack
        });

        store.dispatch({
            type: action.type,
            payload: newPayload
        });

    }

/*
    console.log("ACTION: ",action);
    //this is an api request
    const {url} = action.meta;
    //const fetchOptions = Object.assign();
    var last = `resdia/res-${action.payload.year}${action.payload.month}${action.payload.day}.json`;

    fetch(url+last, {
        headers: {
            'Access-Control-Allow-Origin':'*'
        }
    })
    .then( response => {
        console.log('ya en la respuesta');
        /*
        if (!response.ok) {
            //throw Error(response.statusText);
            return Promise.reject({ error: response.statusText, status: response.status})
        }
        // Read the response as json.
        */
/*
        return response.json();
    })
    .then( responseAsJson => {
        // Do stuff with the JSON
        console.log(responseAsJson);

        store.dispatch({
            type : "CHANGE_DAY",
            payload : responseAsJson
        });
        //dispatch(changeDay(resday))
    })
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
        //return Promise.reject({error: error})
    });
*/

}

export default apiMiddleware;