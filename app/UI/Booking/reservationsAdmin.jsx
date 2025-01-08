"use client";
import { DataGrid } from "@mui/x-data-grid";
import { redirect } from "next/navigation";

function getRowId(row) {
    return row.reservation_number;
}

const columns = [
    {
        field: "user_id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        type: "String",
        flex: 1,
    },
    {
        field: "reservation_number",
        headerName: "Reservation Number",
        headerAlign: "center",
        align: "center",
        flex: 2,
    },
    { field: "trip_id", headerName: "Trip Number", flex: 1 },
    {
        field: "booking_date",
        headerName: "Date",
        type: "Date",
        flex: 1.5,
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
        field: "capacity",
        headerName: "Capacity",
        type: "String",
        flex: 1,
    },
    {
        field: "passenger_count",
        headerName: "Passenger Count",
        description: "Booked seat / Available seats",
        sortable: false,
        flex: 1,
        valueGetter: (value, row) =>
            `${row.passenger_count == null ? 0 : row.passenger_count}/${
                row.capacity || ""
            }`,
    },
    {
        field: "editingButton",
        headerName: "Click to Edit",
        description: "Edit Reservation Details",
        sortable: false,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
            const onClick = (e) => {
                redirect(`/booking/${params.id}`);
            };
            return (
                <button
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold  px-2 rounded"
                    onClick={onClick}
                >
                    Edit
                </button>
            );
        },
    },
    {
        field: "cancelingButton",
        headerName: "Click to Cancel",
        description: "Cancel Reservation",
        sortable: false,
        width: 150,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
            const onClick = (e) => {
                redirect(`/booking/${params.id}`);
            };
            return (
                <button
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold  px-2 rounded"
                    onClick={onClick}
                >
                    Cancel
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
            <button
                onClick={() => {
                    redirect("admin/passenger");
                }}
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded mb-1 mt-3"
            >
                Add Reservation
            </button>
        </>
    );
}
