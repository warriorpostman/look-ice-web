import React from 'react';

import './Spinner.css';

const Spinner = ({ show }) => {
    return <div className={show ? "spinner loading" : "spinner"}></div>;
};

export default Spinner;