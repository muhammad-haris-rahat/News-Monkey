import React, { useEffect  , useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=>{

  const [articles , setArticles] = useState([]);
  const [loading , setLoading] = useState(true);
  const [page , setPage] = useState(1);
  const [totalResults , setTotalResults] = useState(0);

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    console.log(parsedData)
    // console.log(data)
    props.setProgress(100)
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }

  useEffect(()=>{
    
   updateNews()
  } , [])
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`


  // async componentDidMount() {
  // }


  const handleNextClick = async () => {
    setPage(page+1)

  updateNews()
  }

  const handlePrevClick = async () => {
    setPage(page-1)
    updateNews()

  }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`
    setPage(page+1)
    // this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)


  };



    return (
      <>
        <h1 className='text-center' style={{ marginTop: "90px" }}>NewsMonkey - Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults }
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {

                return <div className="col-md-4" key={element.url}> {/* hr article jo hum return kra rhe hain uski koi unique key honey chahiye islea hum yahann key me url daal rhe hain qk hr url unique hotey hain   /*/}
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}


            </div>
          </div>

        </InfiniteScroll>




      </>
    )

}

// News.defaultProps = {
//   country: "us",
//   pageSize: 8,
//   category: "general"
// }
// News.defaultProps = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// }

export default News
