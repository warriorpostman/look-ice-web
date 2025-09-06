// create a React component that renders a table with data called apprehensions. It should accept a prop called "selectedState". In the useEffect, you can do a basic fetch GET and just provide a dummy URL which I'll fill in later.
'use client';
import React, { useEffect, useState } from 'react';
import PagedTable from './PagedTable';
import PropTypes from 'prop-types';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import './Apprehensions.css';

const Apprehensions = () => {
    return (
        <div>
            <h3>Arrests</h3>
            <a href="https://deportationdata.org/docs/ice.html#tables" target="_blank" rel="noopener noreferrer">
                Click here for full explanation of tables on Deportation Data website
            </a>
            <PagedTable 
                headers={[{ header: "ID", accessorKey: "arrestId" },
                    { header: "Gender", accessorKey: "gender" ,
                    // TODO: extract gender transform func
                    cell: ({ cell, row }) => {
                            let customValue = ''
                            if (row.original.gender === "Male") {
                                customValue = 'M';
                            } else if (row.original.gender === "Female") {
                                customValue = 'F' 
                            }
                        return customValue;
                        }
                    },
                    { header: "Appr. Date", accessorKey: "apprehensionDate" },
                    { 
                        // TODO: extract func to transform criminality
                        header: "Appr. Criminality", accessorKey: "apprehensionCriminality",
                        cell: ({ cell, row }) => {
                                const raw = row.original.apprehensionCriminality;
                                let customValue = raw.substring(2,raw.length);
                                return customValue;
                            }
                    },
                    { header: "Appr. Method", accessorKey: "apprehensionMethod" },
                    { header: "State", accessorKey: "apprehensionState" },
                    { header: "Country", accessorKey: "citizenshipCountry" },
                ]}
                dataUrl={`${apiUrl}/api/apprehensions`}
            />
        </div>
    );
};

Apprehensions.propTypes = {
    selectedState: PropTypes.string.isRequired,
};

export default Apprehensions;

