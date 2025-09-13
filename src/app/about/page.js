import React from 'react';
import './About.css';
import {DatasetController} from 'chart.js';
import ArrestsByCountryOfOrigin from '../summary/components/ArrestsByCountryOfOrigin';

const About = () => {
    return (
        <div className="about-section">
            <h2>About lookice</h2>
            <p>
                This website was created as an exercise in data analysis 
                and visualization of raw data sets related to ICE activity 
                from 2023 - 2025.
            </p>
            <p>
                The data used by this website is based on government data 
                provided by ICE in response to a FOIA request to the Deportation 
                Data Project analyzed by myself. For more informaation, 
                see <a 
                    href="https://deportationdata.org/" target="_blank" rel="noopener noreferrer">
                        deportationdata.org
                    </a>.
            </p>
            <p>
                The data presented on this site is presented in almost raw form. Only a 
                few fields were modified (e.g. inconsistent date formats). The DeportationData 
                project has noted that approximately approximately 6,000 records in the
                arrests data are duplicates. As of yet, I have not attempted to de-duplicate 
                the data, but as far as I can tell, these duplicates should not siginificantly 
                affect the trends presented in the Charts section.
            </p>
        </div>
    );
};

export default About;