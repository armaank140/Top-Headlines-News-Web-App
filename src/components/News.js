import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    // console.warn("I am constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title= `${this.capitalizeFirstLetter(this.props.category)}- StarNews`;
 
  } 

  // Code Refactoring
  //Create a Function to fatch data through API 
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5773707394445a4ae866c469da32e99&page=${this.props.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5773707394445a4ae866c469da32e99&page=1&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }

  handlePreClick = async () => {
    // console.log("click privious ");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=c5773707394445a4ae866c469da32e99&page=${this.state.page - 1 }&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({page: this.state.page-1})
    this.updateNews();
  };
  handleNextClick = async () => {
    console.log("Next Click");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=c5773707394445a4ae866c469da32e99&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({page: this.state.page+1})
    this.updateNews();

  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{margin: '40px 0px;'}}>Top {this.capitalizeFirstLetter(this.props.category)}  Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                     source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-primary my-2"
              onClick={this.handlePreClick}
            >
              &#8592; Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.totalResults / this.props.pageSize)
              }
              className="btn btn-primary my-2"
              onClick={this.handleNextClick}
            >
              Next &#8594;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
