"use client";
import { DataGrid } from "@mui/x-data-grid";
import { redirect } from "next/navigation";

function getRowId(row) {
    return row.id;
}

const columns = [
    {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    { field: "train_name_en", headerName: "Train Name", flex: 1 },
    { field: "train_id", headerName: "Train ID", flex: 1 },
    {
        field: "from_station",
        headerName: "From",
        flex: 1,
    },
    {
        field: "to_station",
        headerName: "To",
        type: "String",
        flex: 1,
    },
    {
        field: "date",
        headerName: "Date",
        type: "Date",
        flex: 2,
        valueFormatter: (value) => {
            if (value == null) {
                return "";
            }
            return `${value.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            })}`;
        },
    },
    {
        field: "editingButton",
        headerName: "Click to Edit/Cancel",
        headerAlign: "center",
        description: "Editing trip details",
        sortable: false,
        flex: 1.5,
        align: "center",
        renderCell: (params) => {
            const row = params.row;
            const trainName= row.train_name_en;
            const trainId = row.train_id;
            const fromStation = row.from_station;
            const toStation = row.to_station;
            const date = row.date;
            const onClick = (e) => {
                // redirect(`trips/${params.id}`);
                redirect(`trips/${params.id}=${trainName}=${trainId}=${fromStation}=${toStation}=${date}`);
            };
            return (
                <button
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold  px-2 rounded"
                    onClick={onClick}
                >
                    Edit Details/Cancel
                </button>
            );
        },
    },
];

export default function Datagrid({ rows }) {
    return (
        <>
            <button
                onClick={() => {
                    redirect("trips/add");
                }}
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded mb-1 mt-3"
            >
                Add Trip
            </button>

            <DataGrid
                getRowId={getRowId}
                columns={columns}
                rows={rows}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
            />
        </>
    );
}
