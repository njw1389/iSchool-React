import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import getData from '../utils/getData';
import './News.css';
import './univ.css';

function News() {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  useEffect(() => {
    getData('news/')
      .then((json) => {
        console.log(json);
        setNews(json.older);
        setLoaded(true);
      });
  }, []);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // If the data is not loaded, display a loading spinner
  if (!loaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  const newsPerPage = 1;
  const totalPages = news.length;
  const currentArticle = news[currentPage - 1];

  return (
    <div className="news-container">
      <h1 className="news-heading">RIT News</h1>
      <div className="pagination-container">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="warning"
        />
      </div>
      <div className="news-article">
        <h2 className="news-title">{currentArticle.title}</h2>
        <p className="news-date">{currentArticle.date}</p>
        <p className="news-description">{currentArticle.description}</p>
      </div>
    </div>
  );
}

export default News;