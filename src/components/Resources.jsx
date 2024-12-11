import React, { useState } from 'react';
import getData from '../utils/getData';
import './Resources.css';
import './univ.css';

function Resources() {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [resourcesObj, setResourcesObj] = useState();

  // Go and get the data
  React.useEffect(() => {
    getData('resources/')
      .then((json) => {
        console.log(json);
        setResourcesObj(json);
        setLoaded(true);
      });
  }, []);
 
  // If the data is not loaded, display a loading spinner
  if (!loaded) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );

  // Once the data is loaded, display the resources
  return (
    <div className="resources-container">
      <h1 className="resources-title">{resourcesObj.title}</h1>
      <h2 className="resources-subtitle">{resourcesObj.subTitle}</h2>

      <section className="study-abroad">
        <h3 className="section-title">{resourcesObj.studyAbroad.title}</h3>
        <p className="section-description">{resourcesObj.studyAbroad.description}</p>
        <ul className="places-list">
          {resourcesObj.studyAbroad.places.map((place, index) => (
            <li key={index}>
              <h4>{place.nameOfPlace}</h4>
              <p>{place.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="student-services">
        <h3 className="section-title">{resourcesObj.studentServices.title}</h3>
        
        <div className="academic-advisors">
          <h4>{resourcesObj.studentServices.academicAdvisors.title}</h4>
          <p>{resourcesObj.studentServices.academicAdvisors.description}</p>
          <a href={resourcesObj.studentServices.academicAdvisors.faq.contentHref} target="_blank" rel="noopener noreferrer">
            {resourcesObj.studentServices.academicAdvisors.faq.title}
          </a>
        </div>

        <div className="professional-advisors">
          <h4>{resourcesObj.studentServices.professonalAdvisors.title}</h4>
          <ul>
            {resourcesObj.studentServices.professonalAdvisors.advisorInformation.map((advisor, index) => (
              <li key={index}>
                <span>{advisor.name}</span> <br/>
                <span>{advisor.department}</span> <br/>
                <span><a href={`mailto:${advisor.email}`}>{advisor.email}</a></span> <br/>
              </li>
            ))}
          </ul>
        </div>

        <div className="faculty-advisors">
          <h4>{resourcesObj.studentServices.facultyAdvisors.title}</h4>
          <p>{resourcesObj.studentServices.facultyAdvisors.description}</p>
        </div>

        <div className="minor-advising">
          <h4>{resourcesObj.studentServices.istMinorAdvising.title}</h4>
          <ul>
            {resourcesObj.studentServices.istMinorAdvising.minorAdvisorInformation.map((advisor, index) => (
              <li key={index}>
                <span>{advisor.title}</span> <br/>
                <span>{advisor.advisor}</span> <br/>
                <span><a href={`mailto:${advisor.email}`}>{advisor.email}</a></span> <br/>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tutors-lab">
        <h3 className="section-title">{resourcesObj.tutorsAndLabInformation.title}</h3>
        <p>{resourcesObj.tutorsAndLabInformation.description}</p>
        <a href={resourcesObj.tutorsAndLabInformation.tutoringLabHoursLink} target="_blank" rel="noopener noreferrer">
          Tutoring Lab Hours
        </a>
      </section>

      <section className="student-ambassadors">
        <h3 className="section-title">{resourcesObj.studentAmbassadors.title}</h3>
        <img src={resourcesObj.studentAmbassadors.ambassadorsImageSource} alt="Student Ambassadors" />
        {resourcesObj.studentAmbassadors.subSectionContent.map((content, index) => (
          <div key={index}>
            <h4>{content.title}</h4>
            <p>{content.description}</p>
          </div>
        ))}
        <a href={resourcesObj.studentAmbassadors.applicationFormLink} target="_blank" rel="noopener noreferrer">
          Apply Now
        </a>
        <p>{resourcesObj.studentAmbassadors.note}</p>
      </section>

      <section className="forms">
        <h3 className="section-title">Forms</h3>
        <div className="graduate-forms">
          <h4>Graduate Forms</h4>
          <ul>
            {resourcesObj.forms.graduateForms.map((form, index) => (
              <li key={index}>
                <a href={form.href} target="_blank" rel="noopener noreferrer">
                  {form.formName}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="undergraduate-forms">
          <h4>Undergraduate Forms</h4>
          <ul>
            {resourcesObj.forms.undergraduateForms.map((form, index) => (
              <li key={index}>
                <a href={form.href} target="_blank" rel="noopener noreferrer">
                  {form.formName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="coop-enrollment">
        <h3 className="section-title">{resourcesObj.coopEnrollment.title}</h3>
        {resourcesObj.coopEnrollment.enrollmentInformationContent.map((content, index) => (
          <div key={index}>
            <h4>{content.title}</h4>
            <p>{content.description}</p>
          </div>
        ))}
        <a href={resourcesObj.coopEnrollment.RITJobZoneGuidelink} target="_blank" rel="noopener noreferrer">
          RIT JobZone Guide
        </a>
      </section>
    </div>
  );
}

export default Resources;