"use client";
import { DataGrid } from "@mui/x-data-grid";
import { redirect } from "next/navigation";
import { deleteDependentAction } from "./../../actions/dependents";

function getRowId(row) {
  return row.dependent_id;
}

const columns = [
  {
    field: "dependent_id",
    headerName: "ID",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "sex",
    headerName: "Gender",
    flex: 0.5,
  },
  {
    field: "relationship",
    headerName: "Relationship",
    flex: 1,
  },
  {
    field: "deleteDependent",
    headerName: "Action",
    flex: 0.5,
    renderCell: (params) => {
      return (
        <div className=" flex items-center justify-center ">
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded "
            onClick={() => {
              deleteDependentAction(params.row.dependent_id);
              redirect("/passenger");
            }}
          >
            Delete
          </button>
        </div>
      );
    },
  },
];

export default function Datagrid({ rows }) {
  return (
    <>
      <button
        onClick={() => {
          redirect("passenger/dependents/add");
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
