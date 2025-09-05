import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import StateSelector from './StateSelector';
import Spinner from './Spinner';
import './PagedTable.css';

const PagedTable = ({ headers, dataUrl }) => {
    const [selectedState, setSelectedState] = useState('ALABAMA');
    const [pagination, setPagination] = useState({
        pageIndex: 0, // starts at 0
        pageSize: 10,
    });
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Make this dynamic.
    const totalCount = 40000;
    const columns = React.useMemo(
        () => headers,
        []
    );

    const table = useReactTable({
        data: tableData,
        columns,
        pageCount: Math.ceil(totalCount / pagination.pageSize), // required for server-side
        state: { pagination },
        onPaginationChange: (updaterFunc) => { 
            setPagination(updaterFunc); 
        },
        manualPagination: true, 
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // still needed for UI helpers        getCoreRowModel: getCoreRowModel(),
    });

    const filters = { state: selectedState}
    let queryString = "";
    Object.keys(filters).forEach(key => {
        queryString = queryString + 
            `${queryString.length === 0 ? "" : "&"}` + 
            `${key}=${encodeURIComponent(filters[key])}`;
    });
    const currentUrl = `${dataUrl}?${queryString}&pageNumber=${pagination.pageIndex}`;
    useEffect(() => {
        const fetchData = fetch(currentUrl)

        setIsLoading(true);
        fetchData
            .then(response => response.json())
            .then(data => {
                // console.log('Fetched data:', data);
                setTableData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [pagination.pageIndex, selectedState]);

    return (
        <div className="paged-table-container">
            <StateSelector 
                onSelect={(state) => {
                    setSelectedState(state);
                    setPagination({ pageIndex: 0, pageSize: 10 });
                }}
            />
            <div className="pagination-controls">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage() || isLoading}>
                Previous
                </button>
                <span>
                Page {pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage() || isLoading}>
                Next
                </button>
                <Spinner show={isLoading} />
            </div>
            {tableData && tableData.length > 0 ? 
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
            : <div> Loading... </div>
            }
        </div>
    );
};

export default PagedTable;