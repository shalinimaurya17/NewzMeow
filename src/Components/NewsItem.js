import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgurl, newzurl, author, date,source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{display:"flex",justifyContent:'flex-end',position:"absolute",right:'0'}}>
                    <span className=" badge rounded-pill bg-danger" >
                      {source}
                    
                    </span>
                    </div>
                   
                    <img src={imgurl ? imgurl : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}..</p>
                        <p className="card-text"><small className="text-body-secondary">by {!author ? "unknown" : author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newzurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
