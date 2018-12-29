import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadNews } from './reduxfiles/actions/index';

const mapStateToProps = state => {
    return { news: state.news }
};

const mapDispatchToProps = dispatch => {
    return {
        loadNews: (day, month, year, news) => dispatch(loadNews(day, month, year, news))
    }
}

class ConnectedNews extends Component {

    componentDidMount() {
        this.props.loadNews(1, 12, 2018, []);
    }

    render() {
        const { news } = this.props;
        console.log(news);
        //            gameList.map( game => {

        return (
            <div >

                {
                    news.map( post => {

                        if (post.mainimage !== "no") {
                            return (
                                <div className="pure-g">
                                    <div className="pure-u-1-1 pure-u-sm-1-1">
                                        <h2>
                                            { post.title }
                                        </h2>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="pure-g">
                                    <div className="pure-u-1-1 pure-u-sm-1-1">
                                        <h2>
                                            { post.title }
                                        </h2>
                                    </div>
                                </div>
                            )
                        }

                    })
                }
                
            </div>
        )

    }
}

//const News = connect(null, mapDispatchToProps)(ConnectedNews);
const News = connect(mapStateToProps, mapDispatchToProps)(ConnectedNews);

export default News;