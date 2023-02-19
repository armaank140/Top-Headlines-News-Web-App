import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://s3.cointelegraph.com/uploads/2023-02/f4f239aa-c114-42c1-bda7-8b99ecd3885e.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="/"
          />
          <div className="card-body">
          <span class="position-absolute top-0  translate-middle badge rounded-pill bg-primary" style={{left:'90%' , zIndex:'1'}}>
                {source}
              </span>
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>

            <p className="card-text">
              <small className="text-muted">
                {" "}
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>{" "}
            </p>

            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn  btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
