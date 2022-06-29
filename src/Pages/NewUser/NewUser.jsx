import React, { useRef, useState } from "react";
import { Publish } from "@material-ui/icons";
import style from "../NewUser/NewUser.module.scss";
import damyImg from "../../dummy-profile-pic.png";
import { baseUrl } from "../../Redux/api";
import { useSelector } from "react-redux";
import axios from "axios";import Done from "../../components/Done/Done";
import Joi from "joi";

export default function NewUser() {
  const { adminToken } = useSelector((state) => state.admin);
  const [UpdatedMess, setUpdatedMess] = useState(null);
  const [File, setFile] = useState({});
  const [Inputs, setInputs] = useState({});
  const blah = useRef();
  const schema = Joi.object({
    username: Joi.string()
      .pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{2,20}$/))
      .label("user name")
      .required()
      .messages({
        "string.empty": "plz fill in u name",
        "any.required": "plz send  u name",
        "string.pattern.base": "plz enter valid name char",
      }),
    fullname: Joi.string()
      .required()
      .label("full name")
      .messages({ "string.empty": "must have full name" }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("email"),
    password: Joi.string().required().label("password"),
    cPassword: Joi.string().valid(Joi.ref("password")).required(),
    address: Joi.string().optional(),
    gender: Joi.string().required(),
    img: Joi.object().optional(),
  });
  function handleChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function check() {
    let ele = document.getElementsByName("gender");
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) var genderValue = ele[i].value;
    }
    console.log({File})
    const reqObj = { ...Inputs, gender: genderValue, img: File };
    for (const key in reqObj) {
      document.getElementById(key).innerText = " ";
      document.getElementsByName(key)[0].style.borderColor = "black";
    }
    let { error } = schema.validate(reqObj, { abortEarly: false });
    if (!error) {
      create(reqObj);
    } else {
      error.details.map((detail) => {
        
        document.getElementById(detail.path[0]).innerText = detail.message;
        document.getElementsByName(detail.path[0])[0].style.borderColor = "red";
        return ""; 
      });
    }
  }

  async function create(reqObj) {
    console.log(reqObj)
    setUpdatedMess(false);
    var bodyFormData = new FormData();
    for (var key in reqObj) {
      bodyFormData.append(key, reqObj[key]);
    }
    let {data} = await axios.post(`${baseUrl}/signup`, bodyFormData,{headers: {
      authorization: `Bearer ${adminToken}`,
    }});
    console.log(data)
    if (data.message === "email exist") {
      document.getElementById("email").innerText = data.message;
      document.getElementsByName("email")[0].style.borderColor = "red";
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
          <h2>New User</h2>
          <form className={style.newUserfrom}>
            <div>
              <label>Username</label>
              <input
                name="username"
                type="text"
                placeholder="john"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="username"></p>
            </div>
            <div>
              <label>Full Name</label>
              <input
                name="fullname"
                type="text"
                placeholder="John Smith"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="fullname"></p>
            </div>
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="john@gmail.com"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="email"></p>
            </div>
            <div>
              <label>Address</label>
              <input
                name="address"
                type="text"
                placeholder="New York | USA"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="address"></p>
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="password"></p>
            </div>
            <div>
              <label>confirm password</label>
              <input
                name="cPassword"
                type="password"
                placeholder="password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="cPassword"></p>
            </div>
            <div>
              <div className={style.createBtn}>
                <span className={style.Button} onClick={check}>
                  Create
                </span>
              </div>
            </div>
            <div className="productUpload">
              <div className={style.lastCell}>
                <div className={style.Gender}>
                  <label>Gender</label>
                  <div>
                    <input type="radio" name="gender" id="male" value="male" />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <p id="gender"></p>
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
          </form>
        </div>
      </div>
    </>
  );
}
