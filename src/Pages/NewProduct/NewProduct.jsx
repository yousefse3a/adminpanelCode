import React, { useRef, useState } from "react";
import { Publish } from "@material-ui/icons";
import style from "../NewUser/NewUser.module.scss";
import damyImg from "./noPhoto.webp";
import { baseUrl } from "../../Redux/api";
import { useSelector } from "react-redux";
import axios from "axios";
import Done from "../../components/Done/Done";
import Joi from "joi";
export default function NewProduct() {
  const { adminToken } = useSelector((state) => state.admin);
  const [UpdatedMess, setUpdatedMess] = useState(null);
  const [File, setFile] = useState(null);
  const [Inputs, setInputs] = useState({ title: "", desc: "", inStock: "yes" });
  const [Cat, setCat] = useState([]);
  const blah = useRef();
  const schema = Joi.object({
    title: Joi.string()
      .pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{2,20}$/))
      .label("Title")
      .required()
      .messages({
        "string.empty": "must have title",
        "string.pattern.base": "title must > 3 char",
      }),
    desc: Joi.string()
      .required()
      .label("descraption")
      .messages({ "string.empty": "must have descraption" }),
    price: Joi.number()
      .required()
      .label("price")
      .messages({ "any.required": "must have price" }),
    size: Joi.string().required().label("size").optional(),
    color: Joi.string().required().label("color").optional(),
    inStock: Joi.string().required(),
    categories: Joi.array()
      .items(Joi.string().required())
      .label("categories")
      .messages({ "array.includesRequiredUnknowns": "must have categories" }),
    img: Joi.object().required().messages({ "object.base": "must have img" }),
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
    const reqObj = { ...Inputs, categories: Cat, img: File };
    for (const key in reqObj) {
      if (key !== "inStock") {
        document.getElementById(key).innerText = " ";
        document.getElementsByName(key)[0].style.borderColor = "black";
      }
    }
    let { error } = schema.validate(reqObj, { abortEarly: false });
    if (!error) {
      create(reqObj);
    } else {
      error.details.map((detail) => {
        console.log(detail.path[0], ":", detail.message);
        document.getElementById(detail.path[0]).innerText = detail.message;
        document.getElementsByName(detail.path[0])[0].style.borderColor = "red";
        return "";
      });
    }
  }

  async function create(reqObj) {
    setUpdatedMess(false);
    var bodyFormData = new FormData();
    for (var key in reqObj) {
      bodyFormData.append(key, reqObj[key]);
    }
    let { data } = await axios.post(`${baseUrl}/Product`, bodyFormData, {
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });
    if (data.message === "title exist") {
      document.getElementById("title").innerText = data.message;
      document.getElementsByName("title")[0].style.borderColor = "red";
    } else if (["invaild type", "image requird"].includes(data.message)) {
      document.getElementById("img").innerText = "invaild type of image";
      document.getElementsByName("img")[0].style.borderColor = "red";
    } else {
      setUpdatedMess(data.message);
    }
  }

  return (
    <>
      {UpdatedMess && <Done message={UpdatedMess} />}
      <div className={style.NewUser}>
        <div className={style.NewUserContainer}>
          <h1>New Product</h1>
          <form className={style.newUserfrom}>
            <div>
              <label>Title</label>
              <input
                name="title"
                type="text"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="title"></p>
            </div>
            <div>
              <label>Descripation</label>
              <input
                name="desc"
                type="text"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="desc"></p>
            </div>
            <div>
              <label>price</label>
              <input
                name="price"
                type="number"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="price"></p>
            </div>
            <div>
              <label>Size</label>
              <input
                name="size"
                type="text"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="size"></p>
            </div>
            <div>
              <label>Categories</label>
              <input
                name="categories"
                type="text"
                placeholder="cat1,cat2,..,..."
                onChange={(e) => {
                  handleCat(e);
                }}
              />
              <p id="categories"></p>
            </div>
            <div>
              <label>Color</label>
              <input
                name="color"
                type="text"
                placeholder=""
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="color"></p>
            </div>
            <div className="productUpload">
              <div className={style.lastCell}>
                <div className={style.selectStock}>
                  <label>In Stock</label>
                  <select
                    name="inStock"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
                <div className={style.imgPro}>
                  <img
                    src={damyImg}
                    alt=""
                    name="img"
                    className="productUploadImg"
                    ref={blah}
                  />
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
                  <p id="img" name="img"></p>
                </div>
              </div>
            </div>
            <div className={style.createBtn}>
              <span className={style.Button} onClick={check}>
                Create
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
