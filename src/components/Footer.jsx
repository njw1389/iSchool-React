import React, { useState, useEffect } from 'react';
import getData from '../utils/getData';
import './Footer.css';
import './univ.css';

function Footer() {
	// State variables
  const [loaded, setLoaded] = useState(false);
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    getData('footer/')
      .then((json) => {
        console.log(json);
        setFooter(json);
        setLoaded(true);
      });
  }, []);

  // If the data is not loaded, display a loading spinner
  if (!loaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  // Once the data is loaded, display the footer
  return (
    <footer className="footer">
		<div>
			<div>
				<div class="row">
					<div className='social'>
						<h4>{footer.social.title}</h4>
						<p>
							{footer.social.tweet.replace('https://t.co/NXHaXKjBWu', '')}
							<br />
							<small>{footer.social.by.replace('@ISTatRIT via Twitter', '')}</small><a href="https://t.co/NXHaXKjBWu">@ISTatRIT via Twitter</a>
						</p>
						<ul className="list-inline">
							<li>
								<a href={footer.social.twitter} target="_blank" rel="noopener noreferrer">
								<i className="fab fa-twitter"></i>
								</a>
							</li>
							<li>
								<a href={footer.social.facebook} target="_blank" rel="noopener noreferrer">
								<i className="fab fa-facebook-f"></i>
								</a>
							</li>
						</ul>
					</div>
					<div className='quick-links-div'>
						<h4>Quick Links</h4>
						<ul className="quick-links">
							{footer.quickLinks.map((link, index) => (
								<li key={index}>
								<a href={link.href} target="_blank" rel="noopener noreferrer">
									{link.title}
								</a>
								</li>
							))}
						</ul>
					</div>
				</div>


				<div className='copy'>
					<h4>{footer.copyright.title}</h4>
					<div dangerouslySetInnerHTML={{ __html: footer.copyright.html }}></div>
				</div>
			</div>
		</div>
    </footer>
  );
}

export default Footer;