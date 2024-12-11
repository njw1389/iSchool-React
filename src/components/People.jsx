import React, { useState } from 'react';
import getData from '../utils/getData';
import './People.css';
import './univ.css';

function People() {
    // State variables
    const [loaded, setLoaded] = useState(false); // State for the loading spinner
    const [peopleObj, setPeopleObj] = useState(); // State for the people object
    const [facultyDropdownOpen, setFacultyDropdownOpen] = useState(false); // State for the faculty dropdown
    const [staffDropdownOpen, setStaffDropdownOpen] = useState(false); // State for the staff dropdown

    const toggleFacultyDropdown = () => { // Function to toggle the faculty dropdown
        setFacultyDropdownOpen(!facultyDropdownOpen); // Toggle the dropdown
    };

    const toggleStaffDropdown = () => { // Function to toggle the staff dropdown
        setStaffDropdownOpen(!staffDropdownOpen); // Toggle the dropdown
    };

    // Go and get the data
    React.useEffect(() => {
        getData('people/')
            .then((json) => {
                console.log(json);
                setPeopleObj(json);
                setLoaded(true);
            });
    }, []);

    // If the data is not loaded, display a loading spinner
    if (!loaded)
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading...</p>
            </div>
        );

    // Once the data is loaded, display the people
    return (
        <>
            <div className="peopleContainer">
                <h1 className="peopleTitle OrangeTXT">{peopleObj.title}</h1>
                <h3 className="peopleSubTitle">{peopleObj.subTitle}</h3>

                <div className="peopleSection">
                    <h3 onClick={toggleFacultyDropdown} className={facultyDropdownOpen ? 'open' : ''}>
                        Faculty
                    </h3>
                    {facultyDropdownOpen && (
                        <div className="dropdownContent">
                            {peopleObj.faculty.map((p) => (
                                <div key={p.email} className="peopleListItem">
                                    <img src={p.imagePath} alt="person" />
                                    <p>{p.name}</p>
                                    <h5>{p.username}</h5>
                                    <h4>{p.tagline}</h4>
                                    <h4>{p.title}</h4>
                                    <h4>{p.interestArea}</h4>
                                    <h4><a href={`tel:${p.phone}`}>{p.phone}</a></h4>
                                    <h4><a href={`mailto:${p.email}`}>{p.email}</a></h4>
                                    <h4>{p.office}</h4>
                                    <h4><a href={`${p.website}`}>{p.website}</a></h4>
                                    <h4>{p.twitter}</h4>
                                    <h4>{p.facebook}</h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="peopleSection">
                    <h3 onClick={toggleStaffDropdown} className={staffDropdownOpen ? 'open' : ''}>
                        Staff
                    </h3>
                    {staffDropdownOpen && (
                        <div className="dropdownContent">
                            {peopleObj.staff.map((s) => (
                                <div key={s.email} className="peopleListItem">
                                    <img src={s.imagePath} alt="person" />
                                    <p>{s.name}</p>
                                    <h5>{s.username}</h5>
                                    <h4>{s.tagline}</h4>
                                    <h4>{s.title}</h4>
                                    <h4>{s.interestArea}</h4>
                                    <h4><a href={`tel:${s.phone}`}>{s.phone}</a></h4>
                                    <h4><a href={`mailto:${s.email}`}>{s.email}</a></h4>
                                    <h4>{s.office}</h4>
                                    <h4><a href={`${s.website}`}>{s.website}</a></h4>
                                    <h4>{s.twitter}</h4>
                                    <h4>{s.facebook}</h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default People;