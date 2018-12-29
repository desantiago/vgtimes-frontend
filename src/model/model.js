
class Model {
    constructor() {
        this.baseURL = "http://172.16.100.25:8125/";
    }

    genericFetch(url) {
        return fetch(`${this.baseURL}${url}`, {
            //mode: 'no-cors' // 'cors' by default
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        .then( response => {
            console.log('ya en la respuesta');
            if (!response.ok) {
                //throw Error(response.statusText);
                return Promise.reject({ error: response.statusText, status: response.status})
            }
            // Read the response as json.
            return response.json();
        })
        /*.then( responseAsJson => {
            // Do stuff with the JSON
            console.log(responseAsJson);

            this.setState({
                gameList : responseAsJson
            });
        })*/
        .catch(function(error) {
            //console.log('Looks like there was a problem: \n', error);
            return Promise.reject({error: error})
        });
    }

    getResDay(day, month, year) {
        //alert(`resdia/res-${year}${month}${day}.json`);
        return this.genericFetch(`resdia/res-${year}${month}${day}.json`);
    }

    getNewsDay(day, month, year) {
        return this.genericFetch(`sub/feed-${year}-${month}-${day}.json`);
    }

}

export default Model;