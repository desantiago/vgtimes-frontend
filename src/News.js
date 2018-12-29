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
        let { news } = this.props;
        //console.log(news);

        news = news.map( post => {
            let p = post;
            if (post.nameFeed !== "universo-nintendo" && post.nameFeed !== "levelup") {
                p.mainimage = "http://www.vgtimes.press/"+p.mainimage
            }

            return p;
        })

        return (
            <div >

                {
                    news.map( post => {

                        if (post.mainimage === "no") {
                            return (
                                <div className="pure-g">
                                    <div className="pure-u-1-1 pure-u-sm-1-1">
                                        <h2>
                                            { post.title }
                                        </h2>
                                    </div>
                                    <div className="pure-u-5-5">
                                        <div className="textblock">
                                            <p className="textcont-noimage">
                                                { post.description }
                                            </p>
                                            <div className="footnote">
                                                <span className="feedname"> {post.nameFeed } </span><span className="datefeed"> { post.formattedDate } </span>
                                            </div>
                                        </div>
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

                                    <div className="pure-u-md-1-5 pure-u-sm-1-1 movil100">
                                        <div class="imgcont">
                                            <img src={post.mainimage} alt={post.title} />
                                        </div>
                                    </div>

                                    <div className="pure-u-md-4-5 pure-u-sm-1-1">
                                        <div className="textblock">
                                            <p className="textcont-noimage">
                                                { post.description }
                                            </p>
                                            <div className="footnote">
                                                <span className="feedname"> {post.nameFeed } </span><span className="datefeed"> { post.formattedDate } </span>
                                            </div>
                                        </div>
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