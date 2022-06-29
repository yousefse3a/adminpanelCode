import React from "react";
import { useSelector ,useDispatch} from "react-redux";
import { NotificationsNone, Language } from "@mui/icons-material";
import { Logout } from "../../Redux/adminSlice";
import style from "./Navbar.module.scss";
import damyImg from "../../dummy-profile-pic.png"
import { baseUrl } from "../../Redux/api";
export default function Navbar() {
  const Admin = useSelector((state) => state.admin.admin);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(Logout());
  }

  return (
    <div className={style.Navbar}>
      <div className={style.logo}>
        <span>Admin Panel</span>
      </div>
      <div className={style.leftNavbar}>
        <div className={style.iconContainer}>
          <NotificationsNone />
          <span>2</span>
        </div>
        <div className={style.iconContainer}>
          <Language />
        </div>
        <div className={style.iconContainer}>
          <div onClick={handleLogout} > logout </div>
        </div>
        <div className={style.iconContainer}>
          <img src={Admin.img ? `${baseUrl}${Admin.img}` : damyImg} alt="personalImg" />
        </div>
      </div> 
    </div>
  );
}
