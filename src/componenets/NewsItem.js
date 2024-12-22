import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div className='my-3'>
        <div className="card" >
          <span className='position-absolute top-0  translate-middle badge rounded-pill bg-danger' style={{ left: "90%", zIndex: "1" }}> {source} </span>
          <img src={imageUrl ? imageUrl : "https://cdn.vox-cdn.com/thumbor/HK3ail3FVln-E5VTIhJq_ofpeaw=/0x0:1800x1800/1200x628/filters:focal(881x1255:882x1256)/cdn.vox-cdn.com/uploads/chorus_asset/file/25711908/Kindle_Yellow_book.png"} className="card-img-top" alt="..." />
          <div className="card-body">

            <h5 className="card-title">{title} ...</h5>
            <p className="card-text">{description} ...</p>
            <p className="card-text"><small>By {!author ? "Unknown " : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
