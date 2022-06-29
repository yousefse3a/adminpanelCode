import React from "react";
import damyImg from "../../dummy-profile-pic.png";
import style from "./UserInfo.module.scss";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { baseUrl } from "../../Redux/api";
export default function UserInfo({user}) {
  return (
    <div className={style.userInfo}>
      <div className={style.userInfoContainer}>
        <div className={style.title}>
         {user.img?<img  src={`${baseUrl}${user.img}`} alt="" />:<img  src={damyImg} alt="" />} 
          <div>
            <span>{user.fullname}</span>
            <span>{user.role}</span>
          </div>
        </div>
        <div className={style.details}>
          <h3>Account Details</h3>
          <ul>
            <li>
              <PermIdentity />
              {user.username}
            </li>
            <li>
              <CalendarToday />
              10.12.1999
            </li>
          </ul>
        </div>
        <div className={style.details}>
          <h3>Contact Details</h3>
          <ul>
            <li>
              <PhoneAndroid />
              +1 123 456 67
            </li>
            <li>
              <MailOutline />
              {user.email}
            </li>
            <li>
              <LocationSearching  />
             {user.address}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
