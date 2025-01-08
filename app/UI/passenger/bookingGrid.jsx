"use client";
import { DataGrid } from "@mui/x-data-grid";
import { redirect } from "next/navigation";
import { completePaymentAction } from "../../actions/booking";

function getRowId(row) {
  return row.reservation_number;
}
const columns = [
  {
    field: "reservation_number",
    headerName: "ID",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
  {
    field: "trip_id",
    headerName: "Trip ID",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
  {
    field: "seat_number",
    headerName: "Seat#",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
  {
    field: "seating_class",
    headerName: "Class",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  { field: "from_station", headerName: "From", flex: 1 },
  {
    field: "to_station",
    headerName: "To",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
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
    field: "pay",
    headerName: "Payment",
    renderCell: (params) => {
      if (params.row.status == "paid") {
        return (
          <div className="  flex items-center justify-center ">
            <button
              className="bg-blue-500 text-white font-bold px-2 rounded opacity-50 cursor-not-allowed"
              disabled
            >
              Paid
            </button>
          </div>
        );
      } else {
        return (
          <div className=" flex items-center justify-center ">
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded "
              onClick={() => {
                completePaymentAction(params.row.payment_id);
                redirect("/passenger");
              }}
            >
              {params.row.amount}$
            </button>
          </div>
        );
      }
    },
  },
];

export default function Datagrid({ rows }) {
  return (
    <>
      <button
        onClick={() => {
          redirect("/booking");
        }}
        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded mb-1 mt-3"
      >
        Add
      </button>
      <DataGrid
        getRowId={getRowId}
        className="w-full"
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
