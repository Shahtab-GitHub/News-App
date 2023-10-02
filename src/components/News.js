import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  

  const capitalizedFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  } 
  document.body.style.backgroundColor = '#ffffcc';

  // constructor(props) {
  //   super(props);
    
  // }

  
  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  //updated
  useEffect(() =>{
    document.title = `NewsMonkey - ${capitalizedFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line 
  },[])



  //updated
  // const handlePreviousClick = async () =>{
  //   setPage(page + 1)
  //   updateNews();
  // }


  //updated
  // const handleNextClick = async () =>{
  //     setPage(page + 1)
  //     updateNews();
  // }


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
    

    return (
      <>
        <h2 className="text-center" style = {{margin : '40px 0px', marginTop: '70px'}}>
          NewsApp - top {capitalizedFirstLetter(props.category)} headlines
        </h2>

        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <Spinner/>}
        > 
         <div className="container">
            <div className="row">
              {!loading && articles.map((element, url)=>{
                  return <div className="col-md-4" key = {url}>
                            <NewsItem title = {element.title ? element.title : ""} description = {element.description ? element.description : ""} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} publishedAt = {element.publishedAt} source = {element.source.name}/>
                        </div>
              })}    
            </div> 
          </div> 
        </InfiniteScroll>
        
        
        {/* {loading && <Spinner/>} */}

        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
          <button disabled={(page + 1) > (Math.ceil(totalArticles/props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }


News.defaultProps = {
  country : 'in',
  pageSize : 12,
  category : 'general',
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
}

export default News
