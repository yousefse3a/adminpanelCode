import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAuth, changeError } from "../../Redux/adminSlice";
import Joi from "joi";

import style from "./Login.module.scss";

export default function Login() {
  const [Inputs, setInputs] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  function handleLogin() {
    dispatch(adminAuth({ ...Inputs }));
  }
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  function handleChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function check(e) {
    e.preventDefault();
    dispatch(changeError());
    for (const key in Inputs) {
      document.getElementById(key).innerText = " ";
      document.getElementsByName(key)[0].style.borderColor = "black";
    }
    let { error } = schema.validate(Inputs, { abortEarly: false });
    if (!error) {
      handleLogin();
    } else {
      error.details.map((detail) => {
        document.getElementById(detail.path[0]).innerText = detail.message;
        document.getElementsByName(detail.path[0])[0].style.borderColor = "red";
        return "";
      });
    }
  }

  return (
    <div className={style.Login}>
      <div className={style.Warrper}>
        <h1>Login</h1>
        <form className={style.From}>
          <input
            name={"email"}
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <p id="email"></p>
          <input
            type="password"
            name={"password"}
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <p id="password"></p>
          <p id="apiRes">{error}</p>
          <button
            onClick={(e) => {
              check(e);
            }}
            disabled={loading}
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
}
