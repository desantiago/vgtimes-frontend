import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNews, changePage } from './reduxfiles/actions/index';

const mapStateToProps = state => {
    return { resday: state.resday, dateSel: state.resdayDate }
};

const mapDispatchToProps = dispatch => {
    return {
        loadNews: (day, month, year, news) => dispatch(loadNews(day, month, year, news)),
        changePage: (day, month, year, status) => dispatch(changePage(day, month, year, status))
    }
}

const Resume = ({ gameList, dateSel, onSelectDay }) => (
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
);

const LastNews = ({ news, dateSel, onSelectDay }) => (
    <div className="resday">
        <div className="res-title">Resumen del {dateSel.day}-{dateSel.month}-{dateSel.year}</div>
        {
            news.map( post => {
                if (post.imagen !== 'no') {
                    return (

                        <div className="wrapper newsbox" key={post.title}>
                            <div className="newsimage">
                                <img src={post.imagen} alt={post.title} />
                            </div>
                            <div className="newsbody">
                                <div className="linktitle" key={post.title}>
                                    <a href={post.link}>{post.title}</a>
                                    <span className="feedname">&nbsp;{post.name_feed}</span>
                                </div>                            
                            </div>
                        </div>

                    )
                }
                else {
                    return (

                        <div className="wrapper newsbox" key={post.title}>
                            <div className="newsimage">
                            </div>
                            <div className="newsbody">
                                <div className="linktitle" key={ post.title }>
                                    <a href={post.link}>{ post.title }</a><br/>
                                    <span className="feedname">&nbsp;{ post.name_feed }</span>
                                </div>
                            </div>
                        </div>

                    )
                }
            })
        }
    </div>
);

class ConnectedResDay extends Component {

    onSelectDay = (e) => {
        e.preventDefault();
        const { dateSel } = this.props;
        this.props.loadNews(dateSel.day, dateSel.month, dateSel.year, []);
        this.props.changePage(dateSel.day, dateSel.month, dateSel.year, "add");
    }

    render() {
        const { resday, dateSel } = this.props;

        if (resday.type === "resumen") {
            const gameList = resday.data;
            return (
                <Resume gameList={gameList} dateSel={dateSel} onSelectDay={this.onSelectDay}/>
            )
        }
        else if (resday.type === "last") {
            const news = resday.data;
            return (
                <LastNews news={news} dateSel={dateSel} onSelectDay={this.onSelectDay}/>
            )
        }
        else {
            return <div></div>
        }
    }

};

const ResDay = connect(mapStateToProps, mapDispatchToProps)(ConnectedResDay);

export default ResDay;