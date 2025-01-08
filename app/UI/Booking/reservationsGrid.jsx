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
    { field: "train_name_en", headerName: "Train Name", flex: 1 },
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
        field: "bookingButton",
        headerName: "Click to book",
        description: "Booked seat / Available seats",
        sortable: false,
        width: 150,
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
                    Book
                </button>
            );
        },
    },
];

export default function Datagrid({ rows }) {
    return (
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
    );
}
