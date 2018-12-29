import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { gameList: state.resday }
};

const ConnectedResDay = ({ gameList }) => (

    <div>
        <div>Resumen del Dia</div>
        {
            gameList.map( game => {
                return (
                    <div className="pure-g" key={game.name}>

                        <div className="pure-u-1-5">
                            <div className="thumbnail">
                                <div className="thumbnail">
                                    <img src={game.imagen} alt={game.title}/>
                                </div>
                            </div>
                        </div>

                        <div className="pure-u-4-5">
                            <h3> {game.name} </h3>
                            {
                                game.feeds.map( (feed, index) => {
                                    return (
                                        <div className="linktitle" key={feed.title+index}>
                                            <a href={feed.link}>{feed.title}</a>
                                            <span className="feedname">{feed.name_feed}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="pure-u-5-5 separator"></div>

                    </div>
                )
            })
        }
    </div>

);

const ResDay = connect(mapStateToProps)(ConnectedResDay);

/*
class ResDay extends Component {

    state = {
        gameList : []
    }

    componentDidMount() {
    }

    render() {
        const { gameList } = this.state;

        return (
            <div>
                <div>Resumen del Dia</div>
                {
                    gameList.map( game => {
                        return (
                            <div className="pure-g">
                                <div className="pure-u-1-5">
                                    <div className="thumbnail">
                                        <div className="thumbnail">
                                            <img src={game.imagen} alt={game.title}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="pure-u-4-5">
                                    <h3> {game.name} </h3>
                                    {
                                        game.feeds.map( feed => {
                                            return (
                                                <div className="linktitle">
                                                    <a href={feed.link}>{feed.title}</a>
                                                    <span className="feedname">{feed.name_feed}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className="pure-u-5-5 separator"></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}
*/

export default ResDay;