'use client';
import React, { useEffect, useState } from 'react';
import StateSelector from '../components/StateSelector';
import Apprehensions from '../components/Apprehensions';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ApprehensionPage = () => {
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('ALABAMA');
    useEffect(() => {
        console.log('App component mounted');
        fetch(`${apiUrl}/api/apprehensions/lists/state`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched states:', states);
                setStates(data);
            })
            .catch(error => {
                console.error('Error fetching states:', error);
            });
    }, []);
    return (
        <div>
            <p>This is a simple React application to browse ICE deportation data.</p>
            <StateSelector 
                states={states} 
                onSelect={(state) => setSelectedState(state)} 
            />
            <Apprehensions selectedState={selectedState} />
        </div>
    );
}

export default ApprehensionPage;