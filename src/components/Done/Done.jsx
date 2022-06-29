import React from 'react'
import style from "./Done.module.scss";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export default function Done({message}) {
  return (
    <div className={style.Done}>{message} <CheckCircleOutlineIcon/></div>
  )
}
