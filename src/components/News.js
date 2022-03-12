import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps={
        country: "in",
        pageSize: 10,
        category: "general",
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props){
        super(props);
        this.state= {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `MaxNEWS - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async componentDidMount(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page+1})

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    };
    
    render() {
        return (
            <>
                <h2 className='text-center my-4'>MaxNEWS - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {/*this means if this.state.loading is true then show Spinner*/}
                {this.state.loading && <Spinner/>}     
                
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner/>}>
                
                    <div className='container'>
                        <div className='row'>
                            {this.state.articles.map((element)=>{
                                return (
                                    <div className='col-md-4' key={element.url}>
                                        <NewsItem title={element.title?element.title:"Title not available"}
                                                  description={element.description?element.description:"Description not available"}
                                                  urlToImage={element.urlToImage?element.urlToImage:"https://t4.ftcdn.net/jpg/00/17/77/71/360_F_17777112_qXha4dViITwacvljBhqexBJdA0w09W3p.jpg"}
                                                  urlToNews={element.url}
                                                  author={element.author}
                                                  date={element.publishedAt}
                                                  source={element.source.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    
                </InfiniteScroll>
            </>
        )
    }
}