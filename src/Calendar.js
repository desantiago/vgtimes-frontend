import React, { Component } from 'react';
import CalendarComponent from './components/CalendarComponent';
import { connect } from 'react-redux';
import { changeSelectDay, loadNews, changePage, toogleRes } from './reduxfiles/actions/index';
import { URL } from './Config';

import Model from './model/model';
let model = new Model();
//const URL = "http://172.16.100.25:8125/";

const mapDispatchToProps = dispatch => {
    return {
        //changeDay: resday => dispatch(changeDay(resday)),
        //selectDay: (day, month, year) => dispatch(selectDay(day, month, year)),
        changeSelectDay: (day, month, year, resday) => dispatch(changeSelectDay(day, month, year, resday)),
        loadNews: (day, month, year, news) => dispatch(loadNews(day, month, year, news)),
        changePage: (day, month, year, status) => dispatch(changePage(day, month, year, status)),
        toogleRes: () => dispatch(toogleRes()),
    }
}

class ConnectedCalendar extends Component {

    getResDay(day, month, year) {

        model.getResDay(day, month, year)
        .then( res => {

            var gameList = res.map( item => {
                item.imagen = URL + item.imagen;
                return item;
            });

            this.props.changeDay(gameList);

        })
        .catch( error => {
            alert(error);
        });
    }

    onSelectDay = (day) => {
        //this.props.selectDay(day.getDate(), day.getMonth()+1, day.getFullYear());
        this.props.changeSelectDay(day.getDate(), day.getMonth()+1, day.getFullYear(), []);
    }

    onClickDay = (day) => {
        this.props.loadNews(day.getDate(), day.getMonth()+1, day.getFullYear(), []);
        this.props.changePage(day.getDate(), day.getMonth()+1, day.getFullYear(), "add");
        this.props.toogleRes();
    }

    render() {
        return (
            <div >
                <CalendarComponent onSelectDay={this.onSelectDay} onClickDay={this.onClickDay}/>
            </div>
        )
    }
}

const Calendar = connect(null, mapDispatchToProps)(ConnectedCalendar);

export default Calendar;