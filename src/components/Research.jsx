import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import getData from '../utils/getData';
import './Research.css';
import './univ.css';

function Research() {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [research, setResearch] = useState({ byInterestArea: [], byFaculty: [] });
  const [areaPage, setAreaPage] = useState(1);
  const [facultyPage, setFacultyPage] = useState(1);
  const [displayedCitations, setDisplayedCitations] = useState({
    areas: [],
    faculty: [],
  });

  // Fetch data
  useEffect(() => {
    getData('research/')
      .then((json) => {
        console.log(json);
        setResearch(json);
        // Initialize displayedCitations
        setDisplayedCitations({
          // Initialize areas and faculty arrays with 10
          areas: json.byInterestArea ? json.byInterestArea.map(() => 10) : [],
          faculty: json.byFaculty ? json.byFaculty.map(() => 10) : [],
        });
        setLoaded(true);
      });
  }, []);

  // Update displayedCitations when research data changes
  useEffect(() => {
    // Reset displayedCitations when research data changes 
    setDisplayedCitations((prevState) => ({
      ...prevState, // Copy the previous state
      areas: research.byInterestArea ? research.byInterestArea.map(() => 10) : [], // Reset areas array
      faculty: research.byFaculty ? research.byFaculty.map(() => 10) : [], // Reset faculty array
    }));
  }, [areaPage, facultyPage, research]); // Run this effect when areaPage, facultyPage, or research changes

  const handleAreaPageChange = (event, value) => { // Handle area page change
    setAreaPage(value); // Update area page
    setDisplayedCitations((prevState) => ({ // Update displayedCitations
      ...prevState, // Copy the previous state
      areas: research.byInterestArea ? research.byInterestArea.map(() => 10) : [], // Reset areas array
    }));
  };

  const handleFacultyPageChange = (event, value) => { // Handle faculty page change
    setFacultyPage(value); // Update faculty page
    setDisplayedCitations((prevState) => ({ // Update displayedCitations
      ...prevState, // Copy the previous state
      faculty: research.byFaculty ? research.byFaculty.map(() => 10) : [], // Reset faculty array
    }));
  };

  const handleLoadMore = (type, index) => { // Handle load more button click
    setDisplayedCitations((prevState) => ({ // Update displayedCitations
      ...prevState, // Copy the previous state
      [type]: prevState[type].map((count, i) => (i === index ? count + 10 : count)), // Increment the count at the specified index
    }));
  };

  // Render loading spinner if data is not loaded
  if (!loaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  // Pagination
  const itemsPerPage = 1;
  const areaStartIndex = (areaPage - 1) * itemsPerPage;
  const areaEndIndex = areaStartIndex + itemsPerPage;
  const facultyStartIndex = (facultyPage - 1) * itemsPerPage;
  const facultyEndIndex = facultyStartIndex + itemsPerPage;

  // Render the research component
  return (
    <div className="rit-research-container">
      <h1 className="rit-research-title">RIT Research</h1>
      <Pagination
        className="rit-research-pagination"
        count={Math.ceil(research.byInterestArea.length / itemsPerPage)}
        page={areaPage}
        onChange={handleAreaPageChange}
        color="primary"
      />
      <div className="rit-research-areas">
        {research.byInterestArea.slice(areaStartIndex, areaEndIndex).map((area, index) => (
          <div key={index} className="rit-research-area">
            <h2 className="rit-research-area-name">{area.areaName}</h2>
            <ul className="rit-research-citations">
              {area.citations.slice(0, displayedCitations.areas[index]).map((citation, citationIndex) => (
                <li key={citationIndex} className="rit-research-citation">
                  {citation}
                </li>
              ))}
            </ul>
            {area.citations.length > displayedCitations.areas[index] && (
              <button
                className="rit-load-more-button"
                onClick={() => handleLoadMore('areas', index)}
              >
                Load More
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="rit-research-faculty">
        <h2 className="rit-research-faculty-title">Research by Faculty</h2>
        <Pagination
          className="rit-research-pagination"
          count={Math.ceil(research.byFaculty.length / itemsPerPage)}
          page={facultyPage}
          onChange={handleFacultyPageChange}
          color="primary"
        />
        {research.byFaculty.slice(facultyStartIndex, facultyEndIndex).map((faculty, index) => (
          <div key={index} className="rit-research-faculty-member">
            <h3 className="rit-research-faculty-name">{faculty.facultyName}</h3>
            <p className="rit-research-faculty-username">Username: {faculty.username}</p>
            <ul className="rit-research-faculty-citations">
              {faculty.citations.slice(0, displayedCitations.faculty[index]).map((citation, citationIndex) => (
                <li key={citationIndex} className="rit-research-faculty-citation">
                  {citation}
                </li>
              ))}
            </ul>
            {faculty.citations.length > displayedCitations.faculty[index] && (
              <button
                className="rit-load-more-button"
                onClick={() => handleLoadMore('faculty', index)}
              >
                Load More
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Research;