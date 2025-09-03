// create a React component that renders a table with data called apprehensions. It should accept a prop called "selectedState". In the useEffect, you can do a basic fetch GET and just provide a dummy URL which I'll fill in later.
'use client';
import React, { useEffect, useState } from 'react';
import PagedTable from './PagedTable';
import PropTypes from 'prop-types';
import StateSelector from '../components/StateSelector';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import './Apprehensions.css';

const Apprehensions = () => {
    const [selectedState, setSelectedState] = useState('ALABAMA');

    return (
        <div>
            <h3>Apprehensions in {selectedState}</h3>
            <StateSelector 
                // states={states} 
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
                dataUrl={`${apiUrl}/api/apprehensions`}
                filters={{ state: selectedState }}
            />
        </div>
    );
};

Apprehensions.propTypes = {
    selectedState: PropTypes.string.isRequired,
};

export default Apprehensions;

