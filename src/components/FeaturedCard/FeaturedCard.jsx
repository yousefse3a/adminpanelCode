import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import style from "./FeaturedCard.module.scss";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Redux/api";
import { useSelector } from "react-redux";
import axios from "axios";

export default function FeaturedCard() {
  const { adminToken } = useSelector((state) => state.admin);
  const [Revanue, setRevanue] = useState([]);
  const [Perc, setPerc] = useState([]);
 
  useEffect(() => {
    async function getRevanue() {
      let { data } = await axios.get(`${baseUrl}/Orders/stats`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        }
      });
      data[1] && setPerc((data[1].total * 100) / data[0].total - 100);
      setRevanue(data);
    }
    getRevanue();
  }, [adminToken]);
  return (
    <div className={style.FeaturedCards}>
      <div className={style.FeaturedCard}>
        <span>Revanue</span>
        <div>
          <span>{Revanue[0]?.total}</span>
          <span>
            %{Perc && Math.floor(Perc)}
            {Perc < 0 ? <ArrowDownward className="negtive" /> : <ArrowUpward />}
          </span>
        </div>
        <span>Compared to last month</span>
      </div>
      <div className={style.FeaturedCard}>
        <span>Sales</span>
        <div>
          <span>$4.415</span>
          <span>
            -1.4
            <ArrowDownward className="negtive" />
          </span>
        </div>
        <span>Compared to last month</span>
      </div>
      <div className={style.FeaturedCard}>
        <span>Cost</span>
        <div>
          <span>$2,255</span>
          <span>
            +11.4
            <ArrowUpward />
          </span>
        </div>
        <span>Compared to last month</span>
      </div>
    </div>
  );
}
