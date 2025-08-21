// create a React component that renders a table with data called apprehensions. It should accept a prop called "selectedState". In the useEffect, you can do a basic fetch GET and just provide a dummy URL which I'll fill in later.
'use client';
import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import PropTypes from 'prop-types';
import './Apprehensions.css';

const Apprehensions = ({ selectedState }) => {
    const [apprehensions, setApprehensions] = useState([]);
    const columns = React.useMemo(
        () => [
        { header: "ID", accessorKey: "arrestId" },
        { header: "Gender", accessorKey: "gender" },
        { header: "Appr. Date", accessorKey: "apprehensionDate" },
        { header: "Appr. Criminality", accessorKey: "apprehensionCriminality" },
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
        console.log('Apprehensions component mounted with state:', selectedState);
        const start = (pagination.pageIndex * pagination.pageSize) + pagination.pageSize;
        // Replace with your actual API endpoint
        // fetch(`http://localhost:5117/api/apprehensions?state=${selectedState}`)
        fetch(`http://localhost:8080/api/apprehensions` + 
            `?state=${selectedState}&start=${start}&end=${start + pagination.pageSize}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched apprehensions:', data);
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
};

Apprehensions.propTypes = {
    selectedState: PropTypes.string.isRequired,
};

export default Apprehensions;

