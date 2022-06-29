import React, { useEffect, useState } from "react";
import style from "./Users.module.scss";
import { DeleteOutline } from "@material-ui/icons";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Done from "../../components/Done/Done";
import { baseUrl } from "../../Redux/api";
import axios from "axios";
import { allUsers, deleteUser } from "../../Redux/userSlice";
import damyImg from "../../dummy-profile-pic.png";
import {  CircularProgress } from "@material-ui/core";
export default function Users() {
  const { adminToken } = useSelector((state) => state.admin);
  const [deleteMess, setdeleteMess] = useState(false);
  const { Users } = useSelector((state) => state.users);
  const [UsersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsers(adminToken));
  }, [adminToken,dispatch]);
  useEffect(() => {
    setUsersData(Users);
  }, [Users]);
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.userNameCol}>
            {params.row.img ? (
              <img src={`${baseUrl}${params.row.img}`} alt="" />
            ) : (
              <img src={damyImg} alt="" />
            )}

            <span>{params.row.username}</span>
          </div>
        );
      },
    },
    { field: "email", headerName: "email", width: 150 },
    { field: "role", headerName: "role", width: 120 },
    { field: "address", headerName: "address", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={style.actionCol}>
            <Link to={`/user/${params.row._id}`}>Edit</Link>
            <DeleteOutline
              onClick={() => {
                handleDelete(params.row._id);
              }}
            />
          </div>
        );
      },
    },
  ];
  async function handleDelete(Id) {
    setdeleteMess(false);
    // setUsersData(UsersData.filter((User) => User._id !== Id));
    dispatch(deleteUser(Id));
    let { data } = await axios.delete(`${baseUrl}/user/${Id}`, {
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });
    setdeleteMess(data.message === "user deleted");
  }

  return (
    <>
      {deleteMess && <Done message={"user deleted"} />}
      <div className={style.User}>
        <div className={style.UserContainer}>
          <div>
            <h2>User</h2>
            <div>
              <RefreshIcon
                onClick={() => {
                  dispatch(allUsers(adminToken));
                }}
              />
              <Link to="/NewUser">
                <span>Create</span>
              </Link>
            </div>
          </div>
          {UsersData ? (
            <DataGrid
              rows={UsersData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              className={style.usersTable}
              getRowId={(row) => row._id}
            />
          ) : (
            <div className={style.loading}>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
