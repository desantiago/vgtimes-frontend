import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadNews } from './reduxfiles/actions/index';

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
        //console.log(day, month, year);
        //console.log(news);

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
                        p.mainimage = "http://www.vgtimes.press/"+p.mainimage
                    }
                }
                else {
                    p.mainimage = "http://www.vgtimes.press/"+p.mainimage
                }

                return p;
        });

        /*
        <div className="imgcont">
            <img src={post.mainimage} alt={post.title} />
        </div>
        */

        /*
       <div className="pure-g" key={post.title}>

       <div className="wrapper">
           <div className="newsimage">
               <img src={post.mainimage} alt={post.title} />
           </div>
           <div>
               <p>
                   { post.description }
               </p>
               <div className="footnote">
                   <span className="feedname"> {post.nameFeed } </span><span className="datefeed"> { post.formattedDate } </span>
               </div>
           </div>
       </div>

       <div className="pure-u-md-1-5 pure-u-sm-1-1 movil100">
           <div className="newsimage">
               <img src={post.mainimage} alt={post.title} />
           </div>
       </div>

       <div className="pure-u-md-4-5 pure-u-sm-1-1">
           <h2>
               { post.title }
           </h2>

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
        */

        return (
            <div className="news-container" >
                <h1> Noticias del {newsDate.day}-{newsDate.month}-{newsDate.year} </h1>
                <div>
                {
                    news.map( post => {

                        if (post.type === "simple") {
                            if (post.mainimage === "no") {
                                return (
                                    <div className="newsbox newsbody" key={post.title}>
                                        <div className="footnote">
                                            A las <span className="datefeed"> { post.formattedDate } </span> en <span className="feedname"> {post.nameFeed } </span>
                                        </div>
                                        <h2>
                                            { post.title }
                                        </h2>
                                        <p>
                                            { post.description }
                                        </p>
                                    </div>                                
                                )
                            }
                            else {
                                return (
                                    <div className="wrapper newsbox" key={post.title}>
                                        <div className="newsimage">
                                            <img src={post.mainimage} alt={post.title} />
                                        </div>
                                        <div className="newsbody">
                                            <div className="footnote">
                                                A las <span className="datefeed"> { post.formattedDate } </span> en <span className="feedname"> {post.nameFeed } </span>
                                            </div>
                                            <h2>
                                                { post.title }
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
                            return (
                                <div className="wrapper newsbox" key={post.mainimage}>
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