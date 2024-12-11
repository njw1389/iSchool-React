import React, { useState } from 'react';
import getData from '../utils/getData';
import './Employment.css';
import './univ.css';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Coop table columns
const coopColumns = [
  { id: 'employer', label: 'Employer', minWidth: 170 },
  { id: 'degree', label: 'Degree', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 170 },
  { id: 'term', label: 'Term', minWidth: 170 },
];

// Employment table columns
const employmentColumns = [
  { id: 'employer', label: 'Employer', minWidth: 170 },
  { id: 'degree', label: 'Degree', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 170 },
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'startDate', label: 'Start Date', minWidth: 170 },
];

function Employment() {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [employmentObj, setEmploymentObj] = useState();
  const [coopPage, setCoopPage] = React.useState(0);
  const [coopRowsPerPage, setCoopRowsPerPage] = React.useState(10);
  const [employmentPage, setEmploymentPage] = React.useState(0);
  const [employmentRowsPerPage, setEmploymentRowsPerPage] = React.useState(10);

  // Fetch data
  React.useEffect(() => {
    getData('employment/')
      .then((json) => {
        console.log(json);
        setEmploymentObj(json);
        setLoaded(true);
      });
  }, []);

  const handleCoopChangePage = (event, newPage) => { // Handle coop page change
    setCoopPage(newPage); // Handle coop page change
  };

  const handleCoopChangeRowsPerPage = (event) => { // Handle coop rows per page change
    setCoopRowsPerPage(+event.target.value); // Set rows per page
    setCoopPage(0); // Reset page to 0 when rows per page changes
  };

  const handleEmploymentChangePage = (event, newPage) => { // Handle employment page change
    setEmploymentPage(newPage); // Handle employment page change
  };

  const handleEmploymentChangeRowsPerPage = (event) => { // Handle employment rows per page change
    setEmploymentRowsPerPage(+event.target.value); // Set rows per page
    setEmploymentPage(0); // Reset page to 0 when rows per page changes
  };

  // If the data is not loaded, display a loading spinner
  if (!loaded) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );

  // Once the data is loaded, display the employment information
  return (
    <>
      <div className="employment-container">
        <h1 className="employment-title OrangeTXT">{employmentObj.introduction.title}</h1>
        <div className="employment-intro">
          {employmentObj.introduction.content.map((item, index) => (
            <div key={index} className="intro-item">
              <h2 className="intro-title">{item.title}</h2>
              <p className="intro-description">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="degree-stats">
          <h2 className="stats-title">{employmentObj.degreeStatistics.title}</h2>
          <div className="stats-grid">
            {employmentObj.degreeStatistics.statistics.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-description">{stat.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="careers-employers-container">
          <div className="employers">
            <h2 className="employers-title">{employmentObj.employers.title}</h2>
            <ul className="employer-list">
              {employmentObj.employers.employerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="careers">
            <h2 className="careers-title">{employmentObj.careers.title}</h2>
            <ul className="career-list">
              {employmentObj.careers.careerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="coop-table">
          <h2 className="coop-title">{employmentObj.coopTable.title}</h2>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {coopColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employmentObj.coopTable.coopInformation
                    .slice(coopPage * coopRowsPerPage, coopPage * coopRowsPerPage + coopRowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {coopColumns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={employmentObj.coopTable.coopInformation.length}
              rowsPerPage={coopRowsPerPage}
              page={coopPage}
              onPageChange={handleCoopChangePage}
              onRowsPerPageChange={handleCoopChangeRowsPerPage}
            />
          </Paper>
        </div>
        <div className="employment-table">
          <h2 className="employment-table-title">{employmentObj.employmentTable.title}</h2>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {employmentColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employmentObj.employmentTable.professionalEmploymentInformation
                    .slice(employmentPage * employmentRowsPerPage, employmentPage * employmentRowsPerPage + employmentRowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {employmentColumns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={employmentObj.employmentTable.professionalEmploymentInformation.length}
              rowsPerPage={employmentRowsPerPage}
              page={employmentPage}
              onPageChange={handleEmploymentChangePage}
              onRowsPerPageChange={handleEmploymentChangeRowsPerPage}
            />
          </Paper>
        </div>
        <div className="map-container">
          <iframe
            title="Student Employment Map"
            src="https://ischool.gccis.rit.edu/api/map/"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Employment;