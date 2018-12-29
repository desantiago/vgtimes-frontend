import { CHANGE_SELECT_DAY, LOAD_NEWS } from "../constants/action-types";

import Model from  '../../model/model';
let model = new Model();
const URL = "http://172.16.100.25:8125/";

const apiMiddleware = store => next => action => {

    if (!action.meta || action.meta.type !== 'api') {
        return next(action);
    }

    if (action.type === CHANGE_SELECT_DAY) {
        model.getResDay(action.payload.day, action.payload.month, action.payload.year)
        .then( res => {

            //console.log(res);
            var gameList = res.map( item => {
                item.imagen = URL + item.imagen;
                return item;
            });

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
                resday: gameList
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
            alert(error);
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