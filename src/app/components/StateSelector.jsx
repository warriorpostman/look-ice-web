// create a React component with a select list that takes an array of state strings via props
'use client';
import React from 'react';  
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCallback } from 'react';

const StateSelector = ({ states, onSelect }) => {
    const [selectedState, setSelectedState] = useState('');

    const handleChange = useCallback((event) => {
        setSelectedState(event.target.value);
        onSelect(event.target.value)
    }, []);

    return (
        <div>
            <h3>Select a State:</h3>
            <select value={selectedState} onChange={handleChange}>
                <option value="">--Select a state--</option>
                {states.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            {selectedState && <p>You selected: {selectedState}</p>}
        </div>
    );
}

StateSelector.propTypes = {
    states: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StateSelector;