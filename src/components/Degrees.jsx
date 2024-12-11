import React, { useState } from 'react';
import getData from '../utils/getData';
import './Degrees.css';
import './univ.css';

function Degrees() {
	// State
	// const [data, setData] = useState(null)
	const [loaded, setLoaded] = useState(false);
	const [degreesObj, setDegreesObj] = useState();

	// Go and get the data
	React.useEffect(() => {
		getData('degrees/')
			.then((json)=> {
				console.log(json);
				setDegreesObj(json);
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

    // Once the data is loaded, display the degrees
  	return (
		<>
            <div>
                <div className="underGrad">
                    <h1>Undergraduate Degrees</h1>
                    {degreesObj.undergraduate.map((degree, index) => (
                    <div key={index}>
                        <h2>{degree.title}</h2>
                        <p>{degree.description}</p>
                        <h3>Concentrations:</h3>
                        <ul>
                        {degree.concentrations.map((concentration, idx) => (
                            <li key={idx}>{concentration}</li>
                        ))}
                        </ul>
                    </div>
                    ))}
                </div>
                <div className="Grad">
                    <h1>Graduate Degrees</h1>
                    {degreesObj.graduate.map((degree, index) => (
                    <div key={index}>
                        <h2>{degree.title}</h2>
                        <p>{degree.description}</p>
                        {degree.concentrations && (
                        <>
                            <h3>Concentrations:</h3>
                            <ul>
                            {degree.concentrations.map((concentration, idx) => (
                                <li key={idx}>{concentration}</li>
                            ))}
                            </ul>
                        </>
                        )}
                        {degree.availableCertificates && (
                        <>
                            <h3>Available Certificates:</h3>
                            <ul>
                            {degree.availableCertificates.map((certificate, idx) => (
                                <li key={idx}>{certificate}</li>
                            ))}
                            </ul>
                        </>
                        )}
                    </div>
                    ))}
                </div>
                </div>
		</>
    )
}

export default Degrees;