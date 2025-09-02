// create a React component that renders a table with data called apprehensions. It should accept a prop called "selectedState". In the useEffect, you can do a basic fetch GET and just provide a dummy URL which I'll fill in later.
'use client';
import React, { useEffect, useState } from 'react';
import PagedTable from './PagedTable';
import PropTypes from 'prop-types';
import StateSelector from '../components/StateSelector';
import ProjectTask from './ProjectTask';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const isDevelopment = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'true';

import './Apprehensions.css';

const Apprehensions = () => {
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('ALABAMA');

    useEffect(() => {

        if (!states || states.length === 0) {
            fetch(`${apiUrl}/api/apprehensions/lists/state`)
                .then(response => response.json())
                .then(data => {
                    setStates(data);
                })
                .catch(error => {
                    console.error('Error fetching states:', error);
                });
        }         
    }, [selectedState]);

    return (
        <div>
            <h3>Apprehensions in {selectedState}</h3>
            <StateSelector 
                states={states} 
                onSelect={(state) => {
                    setSelectedState(state);
                }}
            />
            <a href="https://deportationdata.org/docs/ice.html#tables" target="_blank" rel="noopener noreferrer">
                Click here for full explanation of tables on Deportation Data website
            </a>
                <PagedTable 
                    headers={[{ header: "ID", accessorKey: "arrestId" },
                        { header: "Gender", accessorKey: "gender" },
                        { header: "Appr. Date", accessorKey: "apprehensionDate" },
                        { header: "Appr. Criminality", accessorKey: "apprehensionCriminality" },
                        { header: "Appr. Method", accessorKey: "apprehensionMethod" },
                        { header: "Citizenship Country", accessorKey: "citizenshipCountry" },]
                    }
                    dataUrl={`${apiUrl}/api/apprehensions?state=${selectedState}`}
                />
            {isDevelopment === true &&
            <>
                <ProjectTask 
                    title="Reset page index" 
                    description="When new state is selected the page index is staying at whatever user last selected. This needs to be reset to 0." 
                    urgency="HIGH"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Make total record count dynamic" 
                    description="Total record count is hard-coded right now." 
                    urgency="MEDIUM"
                    status="TODO" 
                />
                <ProjectTask 
                    title="Make React table a reusable component" 
                    description="It should have some common set of filters by US state, and other fields." 
                    urgency="MEDIUM"
                    status="TODO" 
                />
            </>
            }
        </div>
    );
};

Apprehensions.propTypes = {
    selectedState: PropTypes.string.isRequired,
};

export default Apprehensions;

