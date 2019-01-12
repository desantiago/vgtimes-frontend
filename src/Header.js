import React, { Component } from 'react';

import { connect } from 'react-redux';
import { toogleRes } from './reduxfiles/actions/index';

const mapDispatchToProps = dispatch => {
    return {
        toogleRes: () => dispatch(toogleRes()),
    }
}

class ConnectedHeader extends Component {

    /*
    constructor() {
        super();
        this.clickToogleRes = this.clickToogleRes.bind(this);
    }
    */

    clickToogleRes = () => {
        this.props.toogleRes();
    }

    render() {
        return (
            <header className="header__vg">
                <h1>VG Times</h1>
                <div className="sub">
                    <div className="currentdate">
                        12 de Enero del 2019
                    </div>
                    <div className="button">
                        <button onClick={this.clickToogleRes}>Ver Otros Dias</button>
                    </div>
                </div>
            </header>
        )
    }

}

const Header = connect(null, mapDispatchToProps)(ConnectedHeader);

export default Header;