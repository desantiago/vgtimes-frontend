import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { resday: state.resday, dateSel: state.resdayDate }
};

//const ConnectedResDay = ({ resday, dateSel }) => (
class ConnectedResDay extends Component {

    render() {

        const { resday, dateSel } = this.props;
        console.log(resday);
        console.log(dateSel);

        if (resday.type === "resumen") {

            const gameList = resday.data;

            return (
                <div>
                    <div className="res-title">Resumen del {dateSel.day}-{dateSel.month}-{dateSel.year}</div>
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
            )
        }
        else if (resday.type === "last") {

            const news = resday.data;

            return (
            <div className="resday">
                <div className="res-title">Resumen del {dateSel.day}-{dateSel.month}-{dateSel.year}</div>
                {
                    news.map( post => {
                        if (post.imagen !== 'no') {
                            return (
                                <div className="pure-g" key={post.title}>

                                    <div className="pure-u-1-5">
                                        <div className="thumbnail">
                                            <div className="thumbnail">
                                                <img src={post.imagen} alt={post.title}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pure-u-4-5">
                                        <div className="linktitle" key={post.title}>
                                            <a href={post.link}>{post.title}</a>
                                            <span className="feedname">&nbsp;{post.name_feed}</span>
                                        </div>
                                    </div>
                                    <div className="pure-u-5-5 separator"></div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="pure-g" key={post.title}>
                                    <div className="pure-u-5-5">
                                        <div className="linktitle" key={ post.title }>
                                            <a href={post.link}>{ post.title }</a>
                                            <span className="feedname">&nbsp;{ post.name_feed }</span>
                                        </div>
                                    </div>
                                    <div className="pure-u-5-5 separator"></div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            )
        }
        else {
            return <div></div>
        }
    }

};

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