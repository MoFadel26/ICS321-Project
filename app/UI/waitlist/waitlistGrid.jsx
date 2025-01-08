"use client";
import { DataGrid } from "@mui/x-data-grid";
import { redirect } from "next/navigation";
import { getUserClass } from "../../actions/util";

function getRowId(row) {
    return row.waiting_id;
}

const columns = [
    {
        field: "waiting_id",
        headerName: "Waiting Number",
        flex: 1,
    },
    {
        field: "passenger_id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    { field: "waiting_status", headerName: "Waiting Status", flex: 1 },
    {
        field: "miles",
        headerName: "Loyalty Class",
        flex: 1,
        renderCell: (params) => {
            const row = params.row;
            const passengerMiles = row.miles;
            return getUserClass(passengerMiles);
        },
    },
    {
        field: "trip_id",
        headerName: "Trips ID",
        flex: 0.5,
    },
    {
        field: "promotingButton",
        headerName: "Promote to Reservation",
        description: "Promote a passenger from waiting list to reservation",
        sortable: false,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
            const row = params.row;
            const passengerId = row.passenger_id;
            const tripId = row.trip_id;
            const passMiles = row.miles;
            const onClick = (e) => {
                redirect(`reservation/${passengerId}=${tripId}=${passMiles}`);
            };
            return (
                <button
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold  px-2 rounded"
                    onClick={onClick}
                >
                    Promote
                </button>
            );
        },
    },
];

export default function Datagrid({ rows }) {
    return (
        <>
            <DataGrid
                getRowId={getRowId}
                className="w-full mt-2 mb-8"
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
