import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import style from "./Chart.module.scss";
export default function Chart({ Data, title, dataKey }) {
  return (
    <div className={style.ChartContainer}>
      <div className={style.Chart}>
        <h3>{title}</h3>
        <ResponsiveContainer width={"100%"} aspect={4 / 1}>
          <LineChart
            data={Data}
            margin={{right: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
