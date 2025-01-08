"use client";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import {redirect} from "next/navigation";

function getRowId(row) {
    // console.log("This is the row.staff " + row.staff_id);
    return row.staff_id;
}

const columns = [
    {
        field: "staff_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "name",
        headerName: "Staff Name",
        headerAlign: "center",
        align: "center",
        flex: 2,
    },
    { field: "role", headerName: "Role", flex: 1 },
    {
        field: "train_id",
        headerName: "Assigned To",
        headerAlign: "center",
        align: "center",
        flex: 2,
    },
    {
        field: "bookingButton2",
        headerName: "Assign Staff",
        description: "Assign staff to a train",
        sortable: false,
        align: "center",
        flex: 1,
        renderCell: (params) => {
            const row = params.row;
            return (
                    <button
                        onClick={() => {
                            const staffId = getRowId(row);
                            const name = row.name;
                            redirect(`staff/${staffId}=${name}`);
                        }}
                        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded mb-1 mt-3"
                    >
                        Assign
                    </button>
            );
        },
    },
];


export default function Datagrid({rows}) {
    return (
        <>
            <DataGrid
                getRowId={getRowId}
                columns={columns}
                rows={rows}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5]}
            />
        </>
    );
}
