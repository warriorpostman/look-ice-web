'use client';

import React, { useState} from 'react';
import PagedTable from '../components/PagedTable';
import StateSelector from '../components/StateSelector';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Detainers() {
    const [selectedState, setSelectedState] = useState('ALABAMA');

    return (
        <div>
            <h3>Detainers in {selectedState}</h3>
            <StateSelector
                onSelect={(state) => {
                    setSelectedState(state);
                }}
            />
            <PagedTable 
                headers={[
                    { header: "ID", accessorKey: "detainerId" },
                    { header: "Gender", accessorKey: "gender" },
                    { header: "Appr. Date", accessorKey: "apprehensionDate" },
                    { header: "Det. Prep. Criminality", accessorKey: "detainerPreparedCriminality" },
                    { header: "Appr. Method", accessorKey: "apprehensionMethod" },
                    { header: "Citizenship Country", accessorKey: "citizenshipCountry" },
                ]}
                dataUrl={`${apiUrl}/api/detainers`}
                filters={{ state: selectedState }}
            />
        </div>
    );
}