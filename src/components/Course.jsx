import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import getData from '../utils/getData';
import './Course.css';
import './univ.css';

function Course() {
  // State Variables
  const [loaded, setLoaded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Go and get the data
  useEffect(() => {
    getData('course/')
      .then((json) => {
        setCourses(json);
        setLoaded(true);
      });
  }, []);

  // Handle course change
  const handleCourseChange = (event, value) => {
    setSelectedCourse(value);
  };

  // If the data is not loaded, show a loading message
  if (!loaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="course-container">
      <h1>Course Catalog</h1>
      <Autocomplete
        id="course-select"
        options={courses}
        getOptionLabel={(option) =>
          `${option.courseID} - ${option.title
            .replace(/&amp;/g, '&')
            .replace(/<br\/><span style="font-size:0.8em;">\[0 credit course\]<\/span>/g, '')}`
        }
        renderInput={(params) => (
          <TextField {...params} label="Search courses" variant="outlined" />
        )}
        onChange={handleCourseChange}
      />
      {selectedCourse && (
        <div className="course-item">
          <h2>
            {selectedCourse.title
              .replace(/&amp;/g, '&')
              .replace(/<br\/><span style="font-size:0.8em;">\[0 credit course\]<\/span>/g, '')}
          </h2>
          <p><strong>Course ID:</strong> {selectedCourse.courseID}</p>
          <p><strong>Description:</strong> {selectedCourse.description}</p>
        </div>
      )}
    </div>
  );
}

export default Course;