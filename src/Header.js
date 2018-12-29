import React, { Component } from 'react';

import { connect } from 'react-redux';
import { toogleRes } from './reduxfiles/actions/index';

const mapDispatchToProps = dispatch => {
    return {
        toogleRes: () => dispatch(toogleRes()),
    }
}

class ConnectedHeader extends Component {

    constructor() {
        super();
        this.clickToogleRes = this.clickToogleRes.bind(this);
    }

    clickToogleRes() {
        this.props.toogleRes();
    }

    render() {
        return (
            <header className="header__vg">
                <span>VGTimes</span>
                <div className="right_side">
                    <button onClick={this.clickToogleRes}>Ver Resumen</button>
                </div>
            </header>
        )
    }

}

const Header = connect(null, mapDispatchToProps)(ConnectedHeader);

export default Header;