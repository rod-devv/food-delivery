import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
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
      </Link>
      <ul className="navbar-menu">
        <Link className="btn-menu" to="/" onClick={() => setMenu("home")}>
          home
        </Link>
        <a
          className="btn-menu"
          href="#explore-menu"
          onClick={() => setMenu("menu")}
        >
          menu
        </a>
        <a
          className="btn-menu"
          href="#app-download"
          onClick={() => setMenu("mob-app")}
        >
          mobile app
        </a>
        <a
          className="btn-menu"
          href="#footer"
          onClick={() => setMenu("contact")}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <Link to="/cart" className="navbar-search-icon">
          {/* <img src={assets.basket_icon} alt="" /> */}
          <i class="fa-solid fa-cart-shopping icon_nav"></i>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            {/* <img src={assets.profile_icon} alt="" /> */}
            <i class="fa-solid fa-user icon_nav"></i>
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                {" "}
                <i class="fa-solid fa-bag-shopping icon_nav2"></i>
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                {" "}
                <i class="fa-solid fa-right-from-bracket icon_nav2"></i>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
