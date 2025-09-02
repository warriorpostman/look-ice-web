'use client';

import React, { useState, useEffect } from 'react';
import PagedTable from '../components/PagedTable';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Detainers() {
    const selectedState = "ALABAMA";

    return (
        <div>
            <h3>Detainers in {selectedState}</h3>
            <p><em>TODO:</em> Add State selector</p>
            <PagedTable 
                onTablePaginationChange={(updaterFunc) => {
                    const newState = updaterFunc(pagination);
                }}
                headers={[
                    { header: "ID", accessorKey: "detainerId" },
                    { header: "Gender", accessorKey: "gender" },
                    { header: "Appr. Date", accessorKey: "apprehensionDate" },
                    { header: "Det. Prep. Criminality", accessorKey: "detainerPreparedCriminality" },
                    { header: "Appr. Method", accessorKey: "apprehensionMethod" },
                    { header: "Citizenship Country", accessorKey: "citizenshipCountry" },
                ]}
                dataUrl={`${apiUrl}/api/detainers?state=${selectedState}`}
            />
        </div>
    );
}