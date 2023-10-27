import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../hooks/useCategory"; //custom hook
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory(); // from custom hooks
  const [cart, setCart] = useCart();

  const logoutHandler = () => {
    // logout and clearing user and token form localstorage
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  return (
    <>
      <header className="container">
        <nav className="navbar">
          <h3>logo</h3>
          <SearchInput />
          <ul className="navlinks">
            <NavLink className="underlinne" to="/">
              Home
            </NavLink>
            {/* <NavLink className='underlinne' to='/category'>Category</NavLink> */}

            <div className="dropdown">
              <NavLink className="underlinne" to="/categories">
                Category
              </NavLink>
              <div className="dropdown-content">
                <Link to={"/categories"} className="underlinne">
                  All Category
                </Link>
                {categories.map((c) => (
                  <>
                    <div key={c._id}>
                      <Link to={`/category/${c._id}`} className="underlinne">
                        {c.name}
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <Badge count={cart?.length} showZero>
              <NavLink className="underlinne" to="/cart">
                Cart{" "}
              </NavLink>
            </Badge>

            {!auth.user ? (
              <>
                <NavLink className="underlinne" to="/register">
                  Register
                </NavLink>
                <NavLink className="underlinne" to="/login">
                  Login
                </NavLink>
              </>
            ) : (
              <>
                {/* <NavLink className='underlinne'>{...auth?.user.name} </NavLink>
                <NavLink className='underlinne' to='/dashboard'>Dashboard</NavLink>
                <NavLink onClick={logoutHandler} className='underlinne' to='/login'>Logout</NavLink> */}

                <div className="dropdown">
                  <label className="dropdown-button">
                    Hi, {auth?.user.name}
                  </label>
                  <div className="dropdown-content">
                    {/* <NavLink className="underlinne">Hi, {auth?.user.name}</NavLink> */}
                    <NavLink
                      className="underlinne"
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      {" "}
                      Dashboard
                    </NavLink>
                    <NavLink
                      className="underlinne"
                      to="/login"
                      onClick={logoutHandler}
                    >
                      {" "}
                      Logout{" "}
                    </NavLink>
                  </div>
                </div>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
