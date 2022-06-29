import React from "react";
import style from "./SideNavbar.module.scss";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
export default function SideNavbar() {
  return (
    <div className={style.SideNav}>
      <div className={style.SidBarMenu}>
        <h3>Dashborad</h3>
        <ul>
          <Link  to="/Home">
            <li className="active">
              <LineStyle /> Home
            </li>
          </Link>

          <Link  to="/comingSoon">
            <li>
              <Timeline /> Analytics
            </li>
          </Link>

          <Link  to="/comingSoon">
            <li>
              <TrendingUp /> Sales
            </li>
          </Link>
        </ul>
      </div>
      <div className={style.SidBarMenu}>
        <h3>Quick Menu</h3>
        <ul>
          <Link  to="/Users">
            <li>
              <PermIdentity />
              Users
            </li>
          </Link>
          <Link  to="/Products">
            <li>
              <Storefront />
              Products
            </li>
          </Link>
          <Link to="/comingSoon">
            <li>
              <AttachMoney />
              Transactions
            </li>
          </Link>

          <Link to="/comingSoon">
            <li>
              <ChatBubbleOutline />
              Messages
            </li>
          </Link>
        </ul>
      </div>
      <div className={style.SidBarMenu}>
        <h3>Notifications</h3>
        <ul>
          <Link to="/comingSoon">
            <li>
              <MailOutline />
              Mail
            </li>
          </Link>
          <Link to="/comingSoon">
            <li>
              <DynamicFeed />
              Feedback
            </li>
          </Link>
          <Link to="/comingSoon">
            <li>
              <ChatBubbleOutline />
              Messages
            </li>
          </Link>
        </ul>
      </div>
      <div className={style.SidBarMenu}>
        <h3>Staff</h3>
        <ul>
          <Link to="/comingSoon">
            <li>
              <WorkOutline />
              Manage
            </li>
          </Link>
          <Link to="/comingSoon">
            <li>
              <Timeline />
              Analytics
            </li>
          </Link>
          <Link to="/comingSoon">
            <li>
              <Report />
              Reports
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
