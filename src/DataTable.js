import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';

// Color Code for chip based on workflow phase.
const chipColors = {
    'Need Metal': 'bg-purple-400',
    'Cutout': 'bg-green-700',
    'Bent': 'bg-orange-400',
}

// Formats date for front-facing UI: 'dd MMM yyyy'
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 100, 
    },
    {
        field: 'partInfo',
        headerName: 'Part',
        width: 200,
        editable: true,
        renderCell: (params) => (
            <div className="flex items-center w-full h-full">
                <div className="px-2">
                    <img src={params.value.image} className="rounded-full w-10 h-10" />
                </div>
                <div className="flex flex-col h-full justify-center">
                    <span className="text-sm">{params.value.name}</span>
                    <span className="text-sm text-gray-400">{params.value.serial}</span>
                </div>
            </div>
        )
    },
    {
        field: 'qty',
        headerName: 'Quantity',
        width: 100,
        editable: true,
        renderCell: (params) => (
            <div className="flex h-full w-full items-center">
                {params.value}
            </div>
        )
    },
    {
        field: 'createdDate',
        headerName: 'Date Created',
        width: 150,
        editable: true,
        renderCell: (params) => (
            <div className="flex flex-col text-sm h-full justify-center">
                <span>Created</span>   
                <span className="text-gray-400">{formatDate(params.value)}</span>
            </div>
        )
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        width: 150,
        editable: true,
        renderCell: (params) => (
            <div className="flex flex-col text-sm h-full justify-center">
                <span>Due</span>   
                <span className="text-gray-400">{formatDate(params.value)}</span>
            </div>
        )
    },
    {
        field: 'progress',
        headerName: 'Progress',
        width: 275,
        editable: true,
        renderCell: (params) => (
            <div className="flex items-center">
                <div className="w-3/4 h-1 m-w-200 bg-blue-200 flex items-center overflow-hidden mr-2">
                    <div
                        className="bg-blue-600 h-full text-xs flex justify-end items-center text-white px-2"
                        style={{ width: `${params.value}%` }}
                    >
                    </div>
                </div>
                <span>{params.value}%</span>
            </div>
        )
    },
    {
        field: 'workflow',
        headerName: 'Work Flow',
        width: 200,
        editable: true,
        renderCell: (params) => (
            <div className="flex items-center justify-end h-full">
                <span className={`${chipColors[params.value]} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                    {params.value}
                </span>
            </div>
        )
    }
]

const rows = [
    { 
        id: 1, 
        partInfo: {image: image1, name: 'Tap Mandrels', serial: 'AV-24-0001'}, 
        qty: 10, 
        createdDate: '2023-12-07', 
        dueDate: '2024-01-02', 
        progress: '50', 
        workflow: 'Need Metal' 
    },
    { 
        id: 2, 
        partInfo: {image: image2, name: 'Stock Angle', serial: 'AV-24-0002'}, 
        qty: 60, 
        createdDate: '2023-12-29', 
        dueDate:  '2024-03-16', 
        progress: '50', 
        workflow: 'Cutout' 
    },
    { 
        id: 3, 
        partInfo: {image: image3, name: 'Snorkel Cover', serial: 'AV-24-0003'}, 
        qty: 26, 
        createdDate: '2024-02-16', 
        dueDate: '2024-03-16', 
        progress: '50', 
        workflow: 'Bent' 
    }
]

export default function DataTable() {
    const [columnVisibility, setColumnVisibility] = useState({ id: false });

    return (
        <div className="flex justify-center w-min mx-auto my-10">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                columnHeaderHeight={0}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                hideFooter
                columnVisibilityModel={columnVisibility}
            />
        </div>
    );
}

// I wasn't sure if the header row should remain since it isn't shown in the 
// figma design, but if it should I would simply remove the columnHeaderHeight property :)