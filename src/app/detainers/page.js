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
                    { header: "Appr. Date", accessorKey: "apprehensionDate",
                        cell: ({ cell, row }) => {
                            const raw = row.original.apprehensionDate;
                            console.log('raw    ', raw);
                            if (raw === null) {
                                return 'n/a';
                            }

                            let customValue = new Date(raw).toLocaleDateString();
                            return customValue;
                        }
                    },
                    { header: "Det. Prep. Criminality", accessorKey: "detainerPreparedCriminality" ,
                        cell: ({ cell, row }) => {
                                const raw = row.original.detainerPreparedCriminality;
                                let customValue = raw.substring(2,raw.length);
                                return customValue;
                            }

                    },
                    { header: "Appr. Method", accessorKey: "apprehensionMethod" },
                    { header: "Citizenship Country", accessorKey: "citizenshipCountry" },
                    // { header: "Facility State", accessorKey: "facilityState" },
                ]}
                dataUrl={`${apiUrl}/api/detainers`}
            />
        </div>
    );
}