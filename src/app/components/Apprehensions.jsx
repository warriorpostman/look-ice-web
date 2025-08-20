// create a React component that renders a table with data called apprehensions. It should accept a prop called "selectedState". In the useEffect, you can do a basic fetch GET and just provide a dummy URL which I'll fill in later.
'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Apprehensions.css';

const Apprehensions = ({ selectedState }) => {
    const [apprehensions, setApprehensions] = useState([]);
    useEffect(() => {
        console.log('Apprehensions component mounted with state:', selectedState);
        // Replace with your actual API endpoint
        // fetch(`http://localhost:5117/api/apprehensions?state=${selectedState}`)
        fetch(`http://localhost:8080/api/apprehensions?state=${selectedState}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched apprehensions:', data);
                setApprehensions(data);
            })
            .catch(error => {
                console.error('Error fetching apprehensions:', error);
            });
    }, [selectedState]);

    return (
        <div>
            <h3>Apprehensions in {selectedState} ({apprehensions.length})</h3>
            {apprehensions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Gender</th>
                            <th>Appr. Date</th>
                            <th>Appr. Criminality</th>
                            <th>Appr. Method</th>
                            <th>Citizenship Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apprehensions.map(apprehension => (
                            <tr key={apprehension.arrestId}>
                                <td>{apprehension.arrestId}</td>
                                <td>{apprehension.gender}</td>
                                <td>{apprehension.apprehensionDate}</td>
                                <td>{apprehension.apprehensionCriminality}</td>
                                <td>{apprehension.apprehensionMethod}</td>
                                <td>{apprehension.citizenshipCountry}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No apprehensions found.</p>
            )}
        </div>
    );
};

Apprehensions.propTypes = {
    selectedState: PropTypes.string.isRequired,
};

export default Apprehensions;

