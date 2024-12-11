import React, { useState } from 'react';
import getData from '../utils/getData';
import './Minors.css';
import './univ.css';
import { Pagination } from '@mui/material';

function Minors() {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [minorsObj, setMinorsObj] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  React.useEffect(() => {
    getData('minors/')
      .then((json) => {
        console.log(json);
        setMinorsObj(json);
        setLoaded(true);
      });
  }, []);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // If the data is not loaded, display a loading spinner
  if (!loaded) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );

  // Pagination
  const minorsPerPage = 1;
  const totalPages = minorsObj.UgMinors.length;
  const currentMinor = minorsObj.UgMinors[currentPage - 1];

  // Once the data is loaded, display the minors
  return (
    <>
      <div className="minors-container">
        <h1 className="minors-title OrangeTXT">Undergraduate Minors</h1>
        <div className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="warning"
          />
        </div>
        <div className="minors-grid">
          <div className="minor-card">
            <h2 className="minor-name">{currentMinor.name}</h2>
            <h3 className="minor-title">{currentMinor.title}</h3>
            <p className="minor-description">{currentMinor.description}</p>
            <div className="minor-courses">
              <h4>Courses:</h4>
              <ul>
                {currentMinor.courses.map((course, courseIndex) => (
                  <li key={courseIndex}>{course}</li>
                ))}
              </ul>
            </div>
            {currentMinor.note && (
              <div className="minor-note">
                <h4>Note:</h4>
                <p>{currentMinor.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Minors;