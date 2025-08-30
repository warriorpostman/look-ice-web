import React from 'react';

const About = () => {
    return (
        <div>
            <h2>About lookice</h2>
            <p>
                This website was created as a personal project as an exercise
                data analysis and visualization of data sets which I had .
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
        </div>
    );
};

export default About;