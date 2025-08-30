'use client';

import React, { useState, useEffect } from 'react';
import PagedTable from '../components/PagedTable';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Detainers() {
    const selectedState = "ALABAMA";
    const [detainers, setDetainers] = useState([]);

    const [pagination, setPagination] = useState({
        pageIndex: 0, // starts at 0
        pageSize: 10,
    });

    useEffect(() => {
        console.log('Detainers component mounted with state:', selectedState);
        const start = (pagination.pageIndex * pagination.pageSize) + pagination.pageSize;
        fetch(`${apiUrl}/api/detainers` + 
            `?state=${selectedState}&start=${start}&end=${start + pagination.pageSize}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched detainers:', data);
                setDetainers(data);
            })
            .catch(error => {
                console.error('Error fetching detainers:', error);
            });
    }, [selectedState, pagination]);

    return (
        <div>
            <h3>Apprehensions in {selectedState} ({detainers.length})</h3>
            {detainers.length === 0 &&
                <p>No apprehensions found.</p>
            }

            <PagedTable 
                onTablePaginationChange={(updaterFunc) => {
                    const newState = updaterFunc(pagination);
                    setPagination(newState);
                }}
                headers={[
                    { header: "ID", accessorKey: "detainerId" },
                    { header: "Gender", accessorKey: "gender" },
                    { header: "Appr. Date", accessorKey: "apprehensionDate" },
                    { header: "Det. Prep. Criminality", accessorKey: "detainerPreparedCriminality" },
                    { header: "Appr. Method", accessorKey: "apprehensionMethod" },
                    { header: "Citizenship Country", accessorKey: "citizenshipCountry" },
                ]}
                tableData={detainers}

            />
        </div>
    );
}