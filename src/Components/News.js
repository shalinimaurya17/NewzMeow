import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}--NewzMeow`;
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42f20d31056f4806b69c58a4b82f0365&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70); 
        console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updateNews();

    }
    handleprev = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();

    }
    handlenext = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();


    }
    fetchMoreData = async () => {
        this.setState({ page:this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42f20d31056f4806b69c58a4b82f0365&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })



    };
    render() {
        return (
            <>
                <h2 className='text-center' style={{ margin: '35px 0px' }} >NewzMeow--Top {this.capitalizeFirstLetter(this.props.category)} Headlines!!</h2>
                {this.state.loading &&<Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}>

                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} newzurl={element.url} imgurl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}


                        </div>
                    </div>
                </InfiniteScroll>
                { /* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handleprev} className="btn btn-dark">&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handlenext} className="btn btn-dark">Next &rarr;</button>
                </div> */
                }

            </>
        )
    }
}
 
export default News
