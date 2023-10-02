import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, publishedAt, source} = props;

    return (
      <div className="container my-3"> 
        <div className="card mb-2">

          <div style={{display : 'flex' , justifyContent : 'flex-end', position : 'absolute', right : '0'}}>
            <span className="badge rounded-pill bg-danger">{!source ? "Unknown" : source}</span>
          </div>

            <img src={!imageUrl ? "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" : imageUrl} className="card-img-top" alt="image"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(publishedAt).toGMTString()}</small></p>
                <a rel="noreferrer" href= {newsUrl} target = "_blank" className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
