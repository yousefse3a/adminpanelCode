import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserEdit from "../../components/UserEdit/UserEdit";
import UserInfo from "../../components/UserInfo/UserInfo";
import style from "./User.module.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Done from "../../components/Done/Done";
import { baseUrl } from "../../Redux/api";
import axios from "axios";

export default function User() {
  const { adminToken } = useSelector((state) => state.admin);
  const [UpdatedMess, setUpdatedMess] = useState(null);
  let loc = useLocation();
  let UserId = loc.pathname.split("/")[2];
  const [User, setUser] = useState({});
  async function getUser() {
    let { data } = await axios.get(`${baseUrl}/user/${UserId}`, {
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });
    setUser(data.findUser);
  }
  useEffect(() => {
    async function getUser() {
      let { data } = await axios.get(`${baseUrl}/user/${UserId}`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });
      setUser(data.findUser);
    }
    getUser();
  }, [adminToken,UserId]);

  return (
    <>
      {UpdatedMess && <Done message={"User updated"} />}
      <div className={style.user}>
        <div>
          <h2>Edit user</h2>
          <Link to="/NewUSer">
            <span>Create</span>
          </Link>
        </div>
        <div className={style.userContainer}>
          <UserInfo user={User} />
          <UserEdit
            user={User}
            setUpdatedMess={setUpdatedMess}
            getUser={getUser}
          />
        </div>
      </div>
    </>
  );
}
