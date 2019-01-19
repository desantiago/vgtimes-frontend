import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadNews } from './reduxfiles/actions/index';
import { URL } from './Config';

const mapStateToProps = state => {
    return { news: state.news, newsDate: state.newsDate }
};

const mapDispatchToProps = dispatch => {
    return {
        loadNews: (day, month, year, news) => dispatch(loadNews(day, month, year, news))
    }
}

class ConnectedNews extends Component {

    componentDidMount() {
        var ahora = new Date();
        this.props.loadNews(ahora.getDate(), ahora.getMonth()+1, ahora.getFullYear(), []);
    }

    render() {
        let { news, newsDate } = this.props;

        let tnews = []
        for (var i = 0; i < news.length; i++) {
            if (news[i]) {
                tnews.push(news[i]);
            }
        }

        news = tnews;

        news = news.map( post => {
                let p = post;
                if (post.type === 'simple') {
                    if (post.nameFeed !== "universo-nintendo" && post.nameFeed !== "levelup") {
                        p.mainimage = URL+p.mainimage
                    }
                }
                else {
                    p.mainimage = URL+p.mainimage
                }

                return p;
        });

        return (
            <div className="news-container" >
                <h1> Noticias del {newsDate.day}-{newsDate.month}-{newsDate.year} </h1>
                <div>
                {
                    news.map( (post, index) => {

                        if (post.type === "simple") {
                            console.log(post.title, "---", post.mainimage, );
                            if (post.mainimage === "no" || post.mainimage.endsWith('no') ) {
                                return (
                                    <div className="newsbox newsbody" key={post.title+index}>
                                        <div className="footnote">
                                            A las <span className="datefeed"> { post.formattedDate } </span> en <span className="feedname"> {post.nameFeed } </span>
                                        </div>
                                        <h2>
                                            <a href={post.link}>{ post.title }</a>
                                        </h2>
                                        <p>
                                            { post.description }
                                        </p>
                                    </div>                                
                                )
                            }
                            else {
                                return (
                                    <div className="wrapper newsbox" key={post.title+index}>
                                        <div className="newsimage">
                                            <img src={post.mainimage} alt={post.title} />
                                        </div>
                                        <div className="newsbody">
                                            <div className="footnote">
                                                A las <span className="datefeed"> { post.formattedDate } </span> en <span className="feedname"> {post.nameFeed } </span>
                                            </div>
                                            <h2>
                                                <a href={post.link}>{ post.title }</a>
                                            </h2>
                                            <p>
                                                { post.description }
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        else {
                            if (post.mainimage === "no") {
                                return (
                                    <div className="newsbox newsbody" key={post.title+index}>
                                        <div className="footnote">
                                            A las <span className="datefeed"> { post.formattedDate } </span> en <span className="feedname"> {post.nameFeed } </span>
                                        </div>
                                        <h2>
                                            <a href={post.link}>{ post.title }</a>
                                        </h2>
                                        <p>
                                            { post.description }
                                        </p>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className="wrapper newsbox" key={"n"+index}>
                                        <div className="newsimage">
                                            <img src={post.mainimage} alt={post.mainimage} />
                                        </div>
                                        <div className="newsbody">
                                            <h2>{ post.maingame }</h2>
                                            {
                                                post.feedList.map( feed => {
                                                    return (
                                                        <div key={feed.title}>
                                                            <a href={feed.link}>{feed.title}</a><span className="feedname"> {feed.nameFeed } </span>
                                                        </div>
                                                    )
                                                } )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })
                }
                </div>
            </div>
        )
    }
}

//const News = connect(null, mapDispatchToProps)(ConnectedNews);
const News = connect(mapStateToProps, mapDispatchToProps)(ConnectedNews);

export default News;