import React from 'react'

const NewsItem =(props)=> {
    
        let { title, description, imgurl, newzurl, author, date,source } = props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{display:"flex",justifyContent:'flex-end',position:"absolute",right:'0'}}>
                    <span className=" badge rounded-pill bg-danger" >
                      {source}
                    
                    </span>
                    </div>
                   
                    <img src={imgurl ? imgurl : "https://media.cnn.com/api/v1/images/stellar/prod/230329122955-kevin-mccarthy-230310-file.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">by {!author ? "unknown" : author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newzurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
