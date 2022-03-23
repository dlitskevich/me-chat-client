import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => (
  <nav className="navbar nav-pills sticky-top">
    <div className="container-fluid">
      <ul className="nav">
        <li className="nav-item">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              ["nav-link", isActive ? "active" : null].filter(Boolean).join(" ")
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            end
            to="/videochat"
            className={({ isActive }) =>
              ["nav-link", isActive ? "active" : null].filter(Boolean).join(" ")
            }
          >
            Video Chat
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
