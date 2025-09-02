import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import './PagedTable.css';

const PagedTable = ({ headers, dataUrl }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0, // starts at 0
        pageSize: 10,
    });
    const [tableData, setTableData] = useState([]);


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
            fetch(dataUrl + `&pageNumber=${pagination.pageIndex}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched apprehensions:', data);
                    setTableData(data);
                })
                .catch(error => {
                    console.error('Error fetching apprehensions:', error);
                });
                setPagination(updaterFunc); 
        },
        manualPagination: true, 
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // still needed for UI helpers        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        fetch(`${dataUrl}&pageNumber=${pagination.pageIndex}`
        ).then(response => response.json())
            .then(data => {
                console.log('Fetched apprehensions:', data);
                setTableData(data);
            })
            .catch(error => {
                console.error('Error fetching apprehensions:', error);
            });
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        });
    }, [dataUrl]);


    return (
        <div className="paged-table-container">
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

export default PagedTable;