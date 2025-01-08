"use client";
import { DataGrid } from "@mui/x-data-grid";
import { redirect } from "next/navigation";

function getRowId(row) {
    return row.train_id;
}

const columns = [
    {
        field: "train_id",
        headerName: "Train ID",
        headerAlign: "center",
        align: "center",
        flex: 2,
    },
    { field: "train_name_en", headerName: "Train Name", flex: 1 },
    {
        field: "from_station",
        headerName: "From",
        headerAlign: "center",
        align: "center",
        flex: 2,
    },
    {
        field: "to_station",
        headerName: "To",
        headerAlign: "center",
        align: "center",
        flex: 2,
    },
    {
        field: "trip_id",
        headerName: "Trip ID",
        type: "String",
        flex: 1,
    },
    {
        field: "date",
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
