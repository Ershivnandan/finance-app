import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  const PublicRoutes = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "login", path: "/login" },
  ];

  const PrivateRoutes = [
    { name: "Home", path: "/dashboard" },
    { name: "Income", path: "/income" },
    { name: "expenses", path: "/expenses" },
    { name: "transactions", path: "/transactions" },
    { name: "savings", path: "/savings" },
  ];
  return (
    <div>
      <nav className="py-1 px-10 flex justify-between items-center relative z-10 shadow-sm shadow-black">
        <div className="flex flex-col items-center justify-center">
          <Link
            to={"/"}
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <img
              className="w-12"
              src="https://ik.imagekit.io/nyw3wwqix/finance-app/3786353-removebg-preview.png?updatedAt=1733133213985"
              alt=""
            />
            <p className={`capitalize font-bold ${user ? "text-gray-700": "text-gray-100"}`}>finance App</p>
          </Link>
        </div>

        <div className="">
          <ul className="flex gap-5 justify-center items-center  text-lg font-semibold capitalize">
            {user
              ? PrivateRoutes.map((items, index) => (
                  <li key={index} className="cursor-pointer text-black">
                    <Link to={items.path}>{items.name}</Link>
                  </li>
                ))
              : PublicRoutes.map((items, index) => (
                  <li key={index} className="cursor-pointer text-white">
                    <Link to={items.path}>{items.name}</Link>
                  </li>
                ))}

            {user && (
              <li onClick={logout} className="cursor-pointer text-black">
                <p>Logout</p>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
