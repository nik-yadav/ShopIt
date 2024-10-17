import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { isAuthenticated, signout } from "../auth/helper";
import Cart from "./Cart";
import { useSelector } from "react-redux";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
];

export function Navbar({ cartState: [open, setOpen] }) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.value.length);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setOpen(true);
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img
              src={process.env.PUBLIC_URL + "/logo512.png"}
              width="40px"
              alt="logo"
            />
          </span>
          <span className="font-bold">ShopIt</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#2ecc72" : "",
                    };
                  }}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#2ecc72" : "",
                    };
                  }}
                >
                  Admin Dashboard
                </NavLink>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li>
                <NavLink
                  to="/user/dashboard"
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#2ecc72" : "",
                    };
                  }}
                >
                  User Dashboard
                </NavLink>
              </li>
            )}

            {!isAuthenticated() && (
              <>
                <li>
                  <NavLink
                    to="/signin"
                    className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#2ecc72" : "",
                      };
                    }}
                  >
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#2ecc72" : "",
                      };
                    }}
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated() && (
              <li>
                <span
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900 cursor-pointer"
                  onClick={() => {
                    signout(() => {
                      navigate("/");
                    });
                  }}
                >
                  Signout
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* cart icon */}
        <div
          className="block rounded-md px-3 py-2 text-sm cursor-pointer font-semibold shadow-sm hover:bg-black/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black relative"
          onClick={toggleCart}
        >
          {/* cart icon */}
          <span className="px-[6px] -right-1 -bottom-2 flex absolute justify-center rounded-full bg-[#E1AD01] text-sm font-medium text-white ring-1 ring-inset ring-gray-500/10">
            {cart}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>

        {/* menu for smaller screens */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <span className="font-bold">DevUI</span>
                  </div>

                  {/* close menu button */}
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50 text-gray-900"
                        style={({ isActive }) => {
                          return {
                            color: isActive ? "#2ecc72" : "",
                          };
                        }}
                      >
                        <span className="ml-3 text-base font-medium">
                          {item.name}
                        </span>
                      </NavLink>
                    ))}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                      <NavLink
                        to="/admin/dashboard"
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 text-gray-900"
                        style={({ isActive }) => {
                          return {
                            color: isActive ? "#2ecc72" : "",
                          };
                        }}
                      >
                        <span className="ml-3 text-base font-medium ">
                          Admin Dashboard
                        </span>
                      </NavLink>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                      <NavLink
                        to="/user/dashboard"
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 text-gray-900"
                        style={({ isActive }) => {
                          return {
                            color: isActive ? "#2ecc72" : "",
                          };
                        }}
                      >
                        <span className="ml-3 text-base font-medium ">
                          User Dashboard
                        </span>
                      </NavLink>
                    )}

                    {!isAuthenticated() && (
                      <>
                        <NavLink
                          to="/signin"
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 text-gray-900"
                          style={({ isActive }) => {
                            return {
                              color: isActive ? "#2ecc72" : "",
                            };
                          }}
                        >
                          <span className="ml-3 text-base font-medium ">
                            Sign in
                          </span>
                        </NavLink>
                        <NavLink
                          to="/signup"
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 text-gray-900"
                          style={({ isActive }) => {
                            return {
                              color: isActive ? "#2ecc72" : "",
                            };
                          }}
                        >
                          <span className="ml-3 text-base font-medium ">
                            Sign up
                          </span>
                        </NavLink>
                      </>
                    )}
                    {isAuthenticated() && (
                      <span
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 text-gray-900 cursor-pointer"
                        onClick={() => {
                          signout(() => {
                            navigate("/");
                          });
                        }}
                      >
                        <span className="ml-3 text-base font-medium ">
                          Signout
                        </span>
                      </span>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Cart cartState={[open, setOpen]} />
    </div>
  );
}

export default Navbar;
