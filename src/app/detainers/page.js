'use client';

import React, { useState} from 'react';
import PagedTable from '../components/PagedTable';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Detainers() {

    return (
        <div>
            <h3>Detainers in</h3>
            <PagedTable 
                headers={[
                    { header: "ID", accessorKey: "detainerId" },
                    { header: "Gender", accessorKey: "gender" },
                    { header: "Appr. Date", accessorKey: "apprehensionDate" },
                    { header: "Det. Prep. Criminality", accessorKey: "detainerPreparedCriminality" },
                    { header: "Appr. Method", accessorKey: "apprehensionMethod" },
                    { header: "Citizenship Country", accessorKey: "citizenshipCountry" },
                    { header: "Facility State", accessorKey: "facilityState" },
                ]}
                dataUrl={`${apiUrl}/api/detainers`}
            />
        </div>
    );
}