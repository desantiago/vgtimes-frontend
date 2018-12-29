import React, { Component } from 'react';
import Calendar from './Calendar';
import ResDay from './ResDay';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { visibleRes: state.visibleRes }
};

class ConnectedRes extends Component {

    render() {

        const {visibleRes} = this.props;

        let classRow="";
        if (visibleRes) {
            classRow="pure-g slidedown"
        }
        else {
            classRow="pure-g slideup"
        }

        return (

            <div className={classRow}>
                <div className="pure-u-2 pure-u-md-1-2"> 
                    <ResDay />
                </div>
                <div className="pure-u-2 pure-u-md-1-2">  
                    <Calendar />
                </div>
            </div>

        )

    }
    
}

const Res = connect(mapStateToProps)(ConnectedRes);

export default Res;