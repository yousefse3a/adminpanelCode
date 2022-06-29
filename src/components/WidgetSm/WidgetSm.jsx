import React, { useEffect, useState } from "react";
import { Visibility } from "@material-ui/icons";
import style from "./WidgetSm.module.scss";
import damyImg from "../../dummy-profile-pic.png";
import { baseUrl } from "../../Redux/api";
import {  useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
export default function WidgetSm() {
  const [newUsers, setnewUsers] = useState([]);
  const { adminToken } = useSelector((state) => state.admin);
  
  useEffect(() => {
    async function getNewUsers() {
      let { data } = await axios.get(`${baseUrl}/users?new=true`,{
        headers: {
          authorization: `Bearer ${
            adminToken 
          }`
        }});
      setnewUsers(data);
    }
    getNewUsers();
  }, [adminToken]);

  return (
    <div className={style.Widget}>
      <div className={style.WidgetContainer}>
        <h3>New Join users</h3>
        {newUsers.map((ele) => (
          <div className={style.newUser} key={ele._id}>
            {ele.img ? (
              <img src={`${baseUrl}${ele.img}`} alt="" />
            ) : (
              <img src={damyImg} alt="" />
            )}
            <div className="userTitle">
              <span>{ele.username}</span>
              {/* <span>Front-end</span> */}
            </div>
            <div className="displayButton">
           
              <Visibility />  <Link to={`/user/${ele._id}`}>display</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
