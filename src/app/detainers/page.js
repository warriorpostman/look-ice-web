'use client';

import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

export default function Detainers() {
    const selectedState = "ALABAMA";
    const [apprehensions, setApprehensions] = useState([]);
    const columns = React.useMemo(
        () => [
        { header: "ID", accessorKey: "detainerId" },
        { header: "Gender", accessorKey: "gender" },
        { header: "Appr. Date", accessorKey: "apprehensionDate" },
        { header: "Det. Prep. Criminality", accessorKey: "detainerPreparedCriminality" },
        { header: "Appr. Method", accessorKey: "apprehensionMethod" },
        { header: "Citizenship Country", accessorKey: "citizenshipCountry" },
        ],
        []
    );

    // TODO: Make this dynamic.
    const totalCount = 265226;

    const [pagination, setPagination] = useState({
        pageIndex: 0, // starts at 0
        pageSize: 10,
    });

    const table = useReactTable({
        data: apprehensions,
        columns,
        pageCount: Math.ceil(totalCount / pagination.pageSize), // required for server-side
        state: { pagination },
        onPaginationChange: setPagination,
        manualPagination: true, // tells TanStack you’re controlling it
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // still needed for UI helpers        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        console.log('Detainers component mounted with state:', selectedState);
        const start = (pagination.pageIndex * pagination.pageSize) + pagination.pageSize;
        // Replace with your actual API endpoint
        // fetch(`http://localhost:5117/api/apprehensions?state=${selectedState}`)
        fetch(`http://localhost:8080/api/detainers` + 
            `?state=${selectedState}&start=${start}&end=${start + pagination.pageSize}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched detainers:', data);
                setApprehensions(data);
            })
            .catch(error => {
                console.error('Error fetching apprehensions:', error);
            });
    }, [selectedState, pagination]);

    return (
        <div>
            <h3>Apprehensions in {selectedState} ({apprehensions.length})</h3>
            {apprehensions.length === 0 &&
                <p>No apprehensions found.</p>
            }

            <div style={{ marginTop: "1rem" }}>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
                </button>
                <span>
                Page {pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
                </button>
            </div>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                        <th key={header.id}>
                            {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}