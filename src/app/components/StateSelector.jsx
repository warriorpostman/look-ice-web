// create a React component with a select list that takes an array of state strings via props
'use client';
import React from 'react';  
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCallback } from 'react';
import APPREHENSION_STATE_NAMES from './apprehensionStateNames.js';

const StateSelector = ({ onSelect }) => {
    // console.log(apprehensionStateNames);
    const [selectedState, setSelectedState] = useState('ALABAMA');

    const handleChange = useCallback((event) => {
        // console.log("use cb state", event.target.value)
        setSelectedState(event.target.value);
        onSelect(event.target.value)
    }, []);

    return (
        <div>
            <h3>Select a State:</h3>
            <select value={selectedState} onChange={handleChange}>
                <option value="">--Select a state--</option>
                {APPREHENSION_STATE_NAMES.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
        </div>
    );
}

StateSelector.propTypes = {
    states: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StateSelector;