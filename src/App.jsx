// App.jsx
import React, { useState } from 'react';
import getData from './utils/getData';
import './components/univ.css';
import './App.css';
// Components
import People from './components/People.jsx';
import Degrees from './components/Degrees.jsx';
import Minors from './components/Minors.jsx';
import Employment from './components/Employment.jsx';
import Course from './components/Course.jsx';
import Footer from './components/Footer.jsx';
import Research from './components/Research.jsx';
import News from './components/News.jsx';
import Resources from './components/Resources.jsx';

function App() {
  // State Variables
  const [loaded, setLoaded] = useState(false);
  const [aboutObj, setAboutObj] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Go and get the data
  React.useEffect(() => {
    getData('about/')
      .then((json) => {
        console.log(json);
        setAboutObj(json);
        setLoaded(true);
      });
  }, []);

  // Scroll to a section
  const scrollToSection = (sectionId) => {
    // Get the section
    const section = document.getElementById(sectionId);
    // Scroll to the section
    if (section) {
      // Add a delay to allow the menu to close
      setTimeout(() => {
        // Subtract the height of the sticky header
        const offset = section.offsetTop - document.querySelector('.sticky').offsetHeight;
        // Scroll to the section
        window.scrollTo({
          // Subtract 10 pixels to account for the sticky header
          top: offset - 10,
          // Smooth scroll
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  // Toggle the menu
  const toggleMenu = () => {
    // Toggle the menu
    setIsMenuOpen(!isMenuOpen);
  };

  // If the data is not loaded, show a loading message
  if (!loaded) {
    return (
      <>
        <div className="sticky">
          <h1>Welcome to the iSchool!</h1>
          <div>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sticky">
        <h1 className='OrangeTXT'>Welcome to the iSchool!</h1>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => scrollToSection('about')}>
            About
          </a>
          <a href="#people" onClick={() => scrollToSection('people')}>
            People
          </a>
          <a href="#course" onClick={() => scrollToSection('course')}>
            Course
          </a>
          <a href="#degrees" onClick={() => scrollToSection('degrees')}>
            Degrees
          </a>
          <a href="#minors" onClick={() => scrollToSection('minors')}>
            Minors
          </a>
          <a href="#news" onClick={() => scrollToSection('news')}>
            News
          </a>
          <a href="#research" onClick={() => scrollToSection('research')}>
            Research
          </a>
          <a href="#employment" onClick={() => scrollToSection('employment')}>
            Employment
          </a>
          <a href="#resources" onClick={() => scrollToSection('resources')}>
            Resources
          </a>
        </nav>
      </div>
      <div className="App">
        <div id="about" className="About">
          <h2>{aboutObj.title}</h2>
          <h3>{aboutObj.description}</h3>
          <div className="aboutQuote">
            <h4 className="quote">{aboutObj.quote}</h4>
            <h4>--{aboutObj.quoteAuthor}</h4>
          </div>
        </div>

        <div id="people">
          <People />
        </div>

        <div id="course">
          <Course />
        </div>

        <div id="degrees">
          <Degrees />
        </div>

        <div id="minors">
          <Minors />
        </div>

        <div id="news">
          <News />
        </div>

        <div id="research">
          <Research />
        </div>

        <div id="employment">
          <Employment />
        </div>

        <div id="resources">
          <Resources />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;