import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, urlToImage, urlToNews, author, date, source} = this.props;
        return (
            <div>
                <div className="card my-3">
                    <div style={{display:"flex", justifyContent:"flex-end", position:"absolute", right:"2px", top:"2px"}}>
                        <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-danger">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={urlToNews} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}