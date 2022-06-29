import React, { useEffect, useState } from "react";
import style from "./WidgetLg.module.scss";
import damyImg from "../../dummy-profile-pic.png";
import { baseUrl } from "../../Redux/api";
import { useSelector } from "react-redux";
// import { format } from "timeago.js";
import axios from "axios";

export default function WidgetLg() {
  const { adminToken } = useSelector((state) => state.admin);
  const [Transcations, setTranscations] = useState([]);
 
  useEffect(() => {
    async function getTranscations() {
      let { data } = await axios.get(`${baseUrl}/Orders`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });
      setTranscations(data);
    }
    getTranscations();
  }, [adminToken]);
  return (
    <div className={style.Widget}>
      <div className={style.WidgetContainer}>
        <h3>Last transcations</h3>

        <table className={style.widgetTable}>
          <tr className={style.widgetTr}>
            <th>Customer ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
          {Transcations.map((ele, index) =>
            index < 4 ? (
              <tr className={style.widgetTd} key={ele._id}>
                <td>
                  <img src={ele.img || damyImg} alt="" />
                  <span>{ele.userId}</span>
                </td>
                {/* <td>{format(ele.createdAt)}</td> */}
                <td>{ele.amount}</td>
                <td>
                  <div className={`${ele.status}`}>{ele.status}</div>
                </td>
              </tr>
            ) : (
              ""
            )
          )}
        </table>
      </div>
    </div>
  );
}
