import { CircularProgress } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Done from "../../components/Done/Done";
import { baseUrl } from "../../Redux/api";
import { allProducts, deleteProduct } from "../../Redux/productSlice";
import style from "../Users/Users.module.scss";

export default function Products() {
  const { adminToken } = useSelector((state) => state.admin);
  const [deleteMess, setdeleteMess] = useState(false);
  const { products } = useSelector((state) => state.products);
  const [ProductData, setProductData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allProducts(adminToken));
  }, [adminToken,dispatch]);
  useEffect(() => {
    setProductData(products);
  }, [products]);
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.userNameCol}>
            <img
              src={`${baseUrl}${params.row.img}`}
              className={style.avater}
              alt=""
            />
            <span>{params.row.title}</span>
          </div>
        );
      },
    },
    { field: "desc", headerName: "desc", width: 150 },
    { field: "inStock", headerName: "inStock", width: 120 },
    { field: "price", headerName: "price", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={style.actionCol}>
            <Link to={`/Product/${params.row._id}`}>Edit</Link>
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
    dispatch(deleteProduct(Id));
    let { data } = await axios.delete(`${baseUrl}/Product/${Id}`, {
      headers: {
          authorization: `Bearer ${adminToken}`,
      }
  });
    setdeleteMess(data.message === "Product deleted");
  }

  return (
    <>
      {deleteMess && <Done message={"Product deleted"} />}
      <div className={style.User}>
        <div className={style.UserContainer}>
          <div>
            <h2>Products</h2>
            <div>
              <RefreshIcon
                onClick={() => {

                  dispatch(allProducts(adminToken));
                }}
              />
              <Link to="/NewProduct">
                <span>Create</span>
              </Link>
            </div>
          </div>
          {ProductData ? (
            <DataGrid
              rows={ProductData}
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
