import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 id="logo">
        {" "}
        <span
          style={{
            color: "white",
            border: "1px solid white",
            padding: "2px",
            borderRadius: "5px",
            marginRight: "2px",
            fontSize: "20px",
          }}
        >
          FooD
        </span>
        elivery{" "}
      </h1>

      <span
        style={{
          color: "yellow",
          border: "1px solid white",
          padding: "10px",
          borderRadius: "5px",
          marginRight: "2px",
          fontSize: "20px",
        }}
      >
        ADMIN PANEL
      </span>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
