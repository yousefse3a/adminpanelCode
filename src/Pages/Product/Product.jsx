import { Publish } from "@material-ui/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "../../components/Chart/Chart";
import { useLocation } from "react-router-dom";
import style from "./Product.module.scss";
import { useSelector } from "react-redux";
import { baseUrl } from "../../Redux/api";
import axios from "axios";
import Done from "../../components/Done/Done";
import Joi from "joi";

export default function Product() {
  const { adminToken } = useSelector((state) => state.admin);
  const [Product, setProduct] = useState({});
  const [UpdatedMess, setUpdatedMess] = useState(null);
  const [pStats, setPStats] = useState([]);
  const [File, setFile] = useState(null);
  const [Cat, setCat] = useState([]);
  const [Inputs, setInputs] = useState({});
  let loc = useLocation();
  let ProductId = loc.pathname.split("/")[2];
  const blah = useRef();
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
  const  getProduct= async ()=> {
      let { data } = await axios.get(`${baseUrl}/Product/${ProductId}`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });
      setProduct(data);
    }
 
  useEffect(() => {
    const  getProduct= async ()=> {
      let { data } = await axios.get(`${baseUrl}/Product/${ProductId}`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });
      setProduct(data);
    }
    const getStats = async () => {
      const { data } = await axios.get(
        `${baseUrl}/Orders/stats?pid=${ProductId}`,
        {
          headers: {
            authorization: `Bearer ${adminToken}`,
          },
        }
      );
      const list = data.sort((a, b) => {
        return a._id - b._id;
      });
      list.map((item) =>
        setPStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );
    };
    getStats();
    getProduct();
  }, [ProductId, MONTHS,adminToken]);
  const schema = Joi.object({
    title: Joi.string()
      .pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{2,20}$/))
      .messages({ "string.empty": "must have full title" })
      .optional(),
    desc: Joi.string()
      .optional()
      .messages({ "string.empty": "must have desc" }),
    size: Joi.string()
      .optional()
      .messages({ "string.empty": "must have size" }),
    price: Joi.number()
      .optional()
      .messages({ "string.empty": "must have price" }),
    categories: Joi.array()
      .optional()
      .messages({ "string.empty": "must have categories" }),
    inStock: Joi.string().optional(),
    img: Joi.object().optional().messages({ "object.base": "must have img" }),
  });
  function handleChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function handleCat(e) {
    setCat(e.target.value.split(","));
  }
  function check() {
    let reqObj = { ...Inputs, categories: Cat };
    if (File) {
      reqObj = { ...reqObj, img: File };
    }
    console.log(reqObj);
    for (const key in reqObj) {
      if (reqObj[key] === "") delete reqObj[key];
      if (key !== "inStock") {
        document.getElementById(key).innerText = " ";
        document.getElementsByName(key)[0].style.borderColor = "black";
      }
    }
    let { error } = schema.validate(reqObj, { abortEarly: false });
    if (!error) {
      update(reqObj);
    } else {
      error.details.map((detail) => {
        document.getElementById(detail.path[0]).innerText = detail.message;
        document.getElementsByName(detail.path[0])[0].style.borderColor = "red";
        return "";
      });
    }
  }
  async function update(reqObj) {
    setUpdatedMess(false);
      var bodyFormData = new FormData();
      for (var key in reqObj) {
        reqObj[key] && bodyFormData.append(key, reqObj[key]);
      }
      bodyFormData.forEach((key, value) => console.log(key, ":", value));
      let { data } = await axios.put(
        `${baseUrl}/Product/${ProductId}`,
        bodyFormData,
        {
          headers: {
            authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log(data)
      if (data.message === "invaild type") {
        document.getElementById("img").innerText = "invaild type of image";
        document.getElementsByName("img")[0].style.borderColor = "red";
      } else {
        setUpdatedMess(true);
        getProduct();
      }
    }
  
  return (
    <>
      {UpdatedMess && <Done message={"product updated"} />}
      <div className={style.Product}>
        <div>
          <h2>Product</h2>
          <Link to="/NewProduct">
            <span>Create</span>
          </Link>
        </div>
        <div className={style.ProductContainer}>
          <div className={style.ProductTop}>
            <div className={style.productChart}>
              <Chart
                Data={pStats}
                title={"product analytics"}
                dataKey={"Sales"}
              />
            </div>
            <div className={style.productDetails}>
              <div className={style.productDetailsContianer}>
                <div className={style.productDetailsLeft}>
                  <span className="productName">{Product.title}</span>
                  <div>
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">{Product._id}</span>
                  </div>
                  <div>
                    <span className="productInfoKey">sales:</span>
                    <span className="productInfoValue">5123</span>
                  </div>
                  <div>
                    <span className="productInfoKey">in stock:</span>
                    <span className="productInfoValue">
                      {Product.inStock ? "yes" : "no"}
                    </span>
                  </div>
                </div>
                <div className={style.productDetailsRight}>
                  <img
                    src={`${baseUrl}${Product.img}`}
                    alt=""
                    className="productInfoImg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.ProductBottom}>
          <form className={style.productForm}>
            <div className={style.productFormLeft}>
              <label>Product Name</label>
              <input
                type="text"
                placeholder={`${Product.title}`}
                name="title"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="title"></p>
              <label>Product Descripation</label>
              <input
                type="text"
                placeholder={`${Product.desc}`}
                name="desc"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="desc"></p>
              <label>Product Size</label>
              <input
                type="text"
                placeholder={`${Product.desc}`}
                name="size"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="size"></p>
              <label>Product categories</label>
              <input
                type="text"
                placeholder={`${Product.desc}`}
                name="categories"
                onChange={(e) => {
                  handleCat(e);
                }}
              />
              <p id="categories"></p>
              <label>In Stock</label>
              <select
                name="inStock"
                id="idStock"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className={style.productFormRight}>
              <div className="productUpload">
                <label htmlFor="imgInp">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="imgInp"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const [file] = e.target.files;
                    setFile(e.target.files[0]);
                    if (file) {
                      blah.current.src = URL.createObjectURL(file);
                    }
                  }}
                />
                <img
                  src={`${baseUrl}${Product.img}`}
                  alt=""
                  className="productUploadImg"
                  ref={blah}
                  name="img"
                />
                <p id="img"></p>
              </div>
              <div className={style.Button} onClick={check}>
                Update
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
