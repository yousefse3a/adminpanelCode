import React, { useRef, useState } from "react";
import { Publish } from "@material-ui/icons";
import style from "./UserEdit.module.scss";
import { baseUrl } from "../../Redux/api";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import Joi from "joi";
import damyImg from "../../dummy-profile-pic.png";
import { refreshLogin } from "../../Redux/adminSlice";

export default function UserEdit({ user, setUpdatedMess, getUser }) {
  const Admin = useSelector((state) => state.admin.admin);
  const { adminToken } = useSelector((state) => state.admin);
  const [File, setFile] = useState();
  const [Inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const blah = useRef();
  const schema = Joi.object({
    username: Joi.string()
      .pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{2,20}$/))
      .label("user name")
      .optional()
      .messages({
        "string.empty": "plz fill in u name",
        "any.required": "plz send  u name",
        "string.pattern.base": "plz enter valid name char",
      }),
    fullname: Joi.string()
      .optional()
      .label("full name")
      .messages({ "string.empty": "must have full name" }),
    email: Joi.string()
      .optional()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .optional()
      .label("email"),
    address: Joi.string().optional(),
    img: Joi.object().optional().messages({ "object.base": "must have img" }),
  });
  function handleChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function check() {
    let reqObj = { ...Inputs };
    if (File) {
      reqObj = { ...reqObj, img: File };
    }
    for (const key in reqObj) {
      if (reqObj[key] === "") delete reqObj[key];
      document.getElementById(key).innerText = " ";
      document.getElementsByName(key)[0].style.borderColor = "black";
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
      `${baseUrl}/User/${user._id}`,
      bodyFormData,
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );
    if (data._id === Admin.id) {
      dispatch(refreshLogin(data.token));
    }
    if (data.message === "invaild type") {
      document.getElementById("img").innerText = "invaild type of image";
      document.getElementsByName("img")[0].style.borderColor = "red";
    } else {
      setUpdatedMess(data.message);
      getUser();
    }
  }
  return (
    <div className={style.userEdit}>
      <div className={style.userEditContainer}>
        <h2>Edit</h2>
        <form className={style.editFrom}>
          <div className={style.leftFrom}>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder={`${user.username}`}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="username"></p>
            </div>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                placeholder={`${user.fullname}`}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="fullname"></p>
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder={`${user.email}`}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="email"></p>
            </div>
            {/* <div>
              <label>Phone</label>
              <input type="text" placeholder="+1 123 456 67" />
            </div> */}
            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder={`${user.address}`}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p id="address"></p>
            </div>
          </div>
          <div className={style.rightFrom}>
            <div>
              <label htmlFor="imgInp">
                <Publish />
              </label>
              {user.img ? (
                <img
                  src={`${baseUrl}${user.img}`}
                  alt=""
                  className="productUploadImg"
                  ref={blah}
                />
              ) : (
                <img
                  src={damyImg}
                  alt=""
                  name="img"
                  className="productUploadImg"
                  ref={blah}
                />
              )}
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

            <div className={style.button} onClick={check}>
              Update
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
