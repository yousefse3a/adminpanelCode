import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Chart from "../../components/Chart/Chart";
import FeaturedCard from "../../components/FeaturedCard/FeaturedCard";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import { baseUrl } from "../../Redux/api";
import { useSelector } from "react-redux";

import style from "./Home.module.scss";
export default function Home() {
  const [userAnalytics, setuserAnalytics] = useState([]);
  const { adminToken } = useSelector((state) => state.admin);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  
  useEffect(() => {
    async function getUserAnalytics() {
      let { data } = await axios.get(`${baseUrl}/users/stats`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });
      setuserAnalytics([]);
      data.map((ele) => {
        return setuserAnalytics((prev) => [
          ...prev,
          {
            name: MONTHS[ele._id - 1],
            "Active User": ele.total,
          },
        ]);
      });
    }
    getUserAnalytics();
    console.log("first")
  },[MONTHS,adminToken]);

  return (
    <div className={style.Home}>
      <FeaturedCard />
      <Chart
        Data={userAnalytics}
        title={"user analytics"}
        dataKey={"Active User"}
      />
      <div className={style.Widgets}>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
