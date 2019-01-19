import React, { Component } from 'react';

import { connect } from 'react-redux';
import { toogleRes } from './reduxfiles/actions/index';
import { MONTHS } from './Config';

const mapDispatchToProps = dispatch => {
    return {
        toogleRes: () => dispatch(toogleRes()),
    }
}

class ConnectedHeader extends Component {

    clickToogleRes = () => {
        this.props.toogleRes();
    }

    getCurrentDate = () => {
        let date = new Date();
        return date.getDate()+" de "+MONTHS[date.getMonth()+1]+" del "+date.getFullYear();
    }

    render() {

        return (
            <header className="header__vg">
                <h1>VG Times</h1>
                <div className="sub">
                    <div className="currentdate">
                        {this.getCurrentDate()}
                    </div>
                    <div className="button">
                        <button onClick={this.clickToogleRes}>Ver Otros Dias</button>
                    </div>
                </div>
                <div className="sub">
                    <div></div>
                    <div style={{textAlign:'right'}}>Click on "Ver Otros Dias" to see a calendar, and choose another day and view small review per day</div>
                </div>
            </header>
        )

    }
}

const Header = connect(null, mapDispatchToProps)(ConnectedHeader);

export default Header;