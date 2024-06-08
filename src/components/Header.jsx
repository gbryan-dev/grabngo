import { useState, useEffect } from "react";
import logoImage from "../images/logo.jpg";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./Header.css";
import axios from "axios";
import apiEndpoints from "./api_endpoints";

function Header() {
  const [categories, setCategories] = useState([]);
  const [countNew, setCountNew] = useState([]);
  const [countSale, setCountSale] = useState([]);
  const [countFeatured, setCountFeatured] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const customerID = localStorage.getItem("logged_customerID");
  useEffect(() => {
    Promise.all([
      axios.get(
        apiEndpoints.find((endpoint) => endpoint.name === "get_categories").url
      ),
      axios.get(
        apiEndpoints.find((endpoint) => endpoint.name === "get_countnewprods")
          .url
      ),
      axios.get(
        apiEndpoints.find((endpoint) => endpoint.name === "get_countsaleprods")
          .url
      ),
      axios.get(
        apiEndpoints.find((endpoint) => endpoint.name === "get_featuredprods")
          .url
      ),
      axios.get(
        `${
          apiEndpoints.find((endpoint) => endpoint.name === "get_allincart").url
        }?Customer_ID=${customerID}`
      ),
    ])
      .then(
        ([
          categoriesResponse,
          countNewResponse,
          countSaleResponse,
          featuredResponse,
          cartResponse,
        ]) => {
          setCategories(categoriesResponse.data);
          setCountNew(countNewResponse.data);
          setCountSale(countSaleResponse.data);
          setCountFeatured(featuredResponse.data);
          setCartItems(cartResponse.data);

          const total = cartResponse.data.reduce(
            (sum, item) => sum + parseFloat(item.total_price),
            0
          );
          setTotalPrice(total.toFixed(2));
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchCartItems = () => {
      axios
        .get(
          `${
            apiEndpoints.find((endpoint) => endpoint.name === "get_allincart")
              .url
          }?Customer_ID=${customerID}`
        )
        .then((cartResponse) => {
          setCartItems(cartResponse.data);
          const total = cartResponse.data.reduce(
            (sum, item) => sum + parseFloat(item.total_price),
            0
          );
          setTotalPrice(total.toFixed(2));
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    };

    fetchCartItems();

    const interval = setInterval(() => {
      fetchCartItems();
    }, 1000);

    return () => clearInterval(interval);
  }, [customerID]);

  const totalProductCount = categories.reduce(
    (acc, curr) => acc + Number(curr.count),
    0
  );
  const totalSaleCount = countSale.reduce(
    (acc, curr) => acc + Number(curr.count),
    0
  );
  const totalNewCount = countNew.reduce(
    (acc, curr) => acc + Number(curr.count),
    0
  );
  const totalCountFeatured = countFeatured.length;

  const deleteProduct = async (productId) => {
    const customerID = localStorage.getItem("logged_customerID");

    axios
      .delete(
        apiEndpoints.find(
          (endpoint) => endpoint.name === "delete_productfromcart"
        ).url,
        {
          params: {
            Product_ID: productId,
            Customer_ID: customerID,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          alert("Product deleted from cart successfully");
        } else {
          alert("Failed to delete product from cart");
        }
      })
      .catch((error) => {
        console.error("Error deleting product from cart:", error);
      });
  };

  const topcategories = [
    {
      path: "/allProducts/Featured",
      label: "Featured Products",
      count: totalCountFeatured,
    },
    {
      path: "/allProducts/New",
      label: "New Products",
      count: totalNewCount,
      category: "New",
    },
    {
      path: "/allProducts/Sale",
      label: "Sale Products",
      count: totalSaleCount,
      category: "Sale",
    },
    { path: "/allProducts", label: "All Products", count: totalProductCount },
  ];

  const menuItems = [
    { title: "HOME", path: "/home" },
    { title: "ABOUT US", path: "/about" },
    { title: "ALL PRODUCTS", path: "/allProducts" },
    { title: "CONTACT US", path: "/contact" },
    { title: "REVIEWS", path: "/reviews" },
  ];

  const isMobile = window.innerWidth <= 768;

  const Logoo = styled.div`
    display: flex;

    // @media (max-width: 768px) {
    //   display: none;
    // }
  `;

  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      <div id="sns_wrapper">
        <div id="sns_header" className="wrap">
          <div className="sns_header_top">
            <div className="container">
              <div className="sns_module">
                <div className="header-account">
                  <div className="myaccount">
                    <div className="tongle" style={{ paddingTop: "8px" }}>
                      <i
                        className="ph ph-user"
                        style={{ color: "#666666" }}
                      ></i>
                      <span>My account </span>
                    </div>

                    <div className="customer-ct content">
                      <ul className="links">
                        {localStorage.getItem("logged_username") ? (
                          <>
                            <li className="first">
                              <a href="#">
                                {" "}
                                <i className="ph ph-user"></i> My Account
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i
                                  className="ph ph-shopping-cart"
                                  style={{ paddingRight: "5px" }}
                                ></i>
                                Checkout
                              </a>
                            </li>
                            <li>
                              <a
                                href=""
                                onClick={() => {
                                  localStorage.removeItem("logged_username");
                                  localStorage.removeItem("logged_customerID");
                                }}
                              >
                                <i className="ph ph-power"></i> Logout
                              </a>
                            </li>
                          </>
                        ) : (
                          <>
                            <li
                              className="first"
                              style={
                                isMobile ? { display: "none" } : { opacity: 0 }
                              }
                            >
                              <a className="top-link-myaccount"></a>
                            </li>
                            <li
                              style={
                                isMobile ? { display: "none" } : { opacity: 0 }
                              }
                            >
                              <a className="top-link-checkout"></a>
                            </li>
                            <li
                              style={
                                isMobile ? { display: "none" } : { opacity: 0 }
                              }
                            >
                              <a className="top-link-logout"></a>
                            </li>

                            <li className="last">
                              <a href="/login">
                                <i className="ph ph-user"></i> Login
                              </a>
                            </li>
                            <li>
                              <a href="/register">
                                <i className="ph ph-table"></i> Register
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="sns_header_logo">
            <Logoo className="container">
              <div className="container_in">
                <div
                  className="row"
                  style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <h1 id="logo" className="responsv col-md-3">
                    <img alt="" src={logoImage} />
                  </h1>
                </div>
              </div>
            </Logoo>
          </div>

          <div id="sns_menu">
            <div className="container" style={{ background: "#222222" }}>
              <div className="sns_mainmenu">
                <div id="sns_mainnav">
                  <div id="sns_custommenu" className="visible-md visible-lg">
                    <ul className="mainnav">
                      {menuItems.map((item, index) => (
                        <li
                          key={index}
                          className={`level0 custom-item`}
                          style={{ marginRight: "10px" }}
                        >
                          <NavLink
                            className="menu-title-lv0 pd-menu116"
                            to={item.path}
                            exact
                          >
                            <span
                              className="title"
                              style={{
                                color:
                                  location.pathname === item.path
                                    ? "#E14141"
                                    : "grey",
                                fontWeight:
                                  location.pathname === item.path
                                    ? "bold"
                                    : "500",
                              }}
                            >
                              {item.title}
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    id="sns_mommenu"
                    className="menu-offcanvas hidden-md hidden-lg"
                  >
                    <span
                      className="btn2 btn-navbar offcanvas"
                      onClick={() => {
                        setShowMenu(!showMenu);
                        setShowCategories(false);
                      }}
                    >
                      <i
                        className="ph ph-list"
                        style={{ color: "#666666" }}
                      ></i>
                      <span className="overlay"></span>
                    </span>

                    {location.pathname.includes("allProducts") && (
                      <span
                        className="btn2 btn-navbar offcanvas"
                        onClick={() => {
                          setShowMenu(false);
                          setShowCategories(!showCategories);
                        }}
                      >
                        <i
                          className="ph ph-list-bullets"
                          style={{ color: "#666666" }}
                        ></i>
                        <span className="overlay"></span>
                      </span>
                    )}

                    {showMenu && (
                      <div className="offcanvas">
                        <ul className="mainnav">
                          {menuItems.map((item, index) => (
                            <li
                              key={index}
                              className={`level0 custom-item ${
                                location.pathname === item.path ? "active" : ""
                              }`}
                            >
                              <div className="accr_header">
                                <NavLink
                                  className="menu-title-lv0"
                                  to={item.path}
                                  activeClassName="active"
                                  exact={item.path === "/home"}
                                >
                                  <span className="title">{item.title}</span>
                                </NavLink>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {showCategories && (
                      <div className="offcanvas">
                        <ul className="mainnav">
                          <h5 className="title" style={{ color: "#e34444" }}>
                            Categories :
                          </h5>
                          {topcategories.map((category, index) => (
                            <li
                              key={index}
                              className={`level0 custom-item ${
                                location.pathname === category.prod_category
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {" "}
                              <div className="accr_header">
                                <NavLink
                                  className="menu-title-lv0"
                                  to={category.path}
                                  activeClassName="active"
                                  onClick={() => {
                                    setShowMenu(false);
                                    setShowCategories(!showCategories);
                                  }}
                                >
                                  <span className="title">
                                    {category.label} ({category.count})
                                  </span>
                                </NavLink>
                              </div>
                            </li>
                          ))}

                          {categories.map((category, index) => (
                            <li
                              key={index}
                              className={`level0 custom-item ${
                                location.pathname === category.prod_category
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div className="accr_header">
                                <NavLink
                                  className="menu-title-lv0"
                                  to={`/allProducts/${category.prod_category.replace(
                                    /[^/]+$/,
                                    category.prod_category
                                  )}`}
                                  activeClassName="active"
                                  onClick={() => {
                                    setShowMenu(false);
                                    setShowCategories(!showCategories);
                                  }}
                                >
                                  <span className="title">
                                    {category.prod_category} ({category.count})
                                  </span>
                                </NavLink>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="sns_menu_right">
                  <div className="block_topsearch">
                    <div className="top-cart">
                      <div className="mycart mini-cart">
                        <div className="block-minicart">
                          <div className="tongle">
                            <i
                              className="ph ph-shopping-cart"
                              style={{ top: "3px", left: "-5px" }}
                            ></i>
                            <div className="summary">
                              <span className="amount">
                                <a href="#">
                                  <span> {cartItems.length} </span>( items )
                                </a>
                              </span>
                            </div>
                          </div>
                          <div className="block-content content">
                            <div className="block-inner">
                              <ol
                                id="cart-sidebar"
                                className="mini-products-list"
                                style={{
                                  maxHeight: "435px",
                                  overflowY: "auto",
                                  scrollbarWidth: "thin",
                                }}
                              >
                                {cartItems.map((item, index) => (
                                  <li key={index} className="item odd">
                                    <a className="product-image">
                                      <img
                                        src={`/src/images/products/${item.prod_img}`}
                                        style={{ height: "110px" }}
                                      />
                                    </a>
                                    <div className="product-details">
                                      <i
                                        className="ph ph-x"
                                        style={{
                                          position: "absolute",
                                          right: "0px",
                                          cursor: "pointer",
                                          color: "#e34444",
                                        }}
                                        onClick={() =>
                                          deleteProduct(item.Product_ID)
                                        }
                                      ></i>
                                      <strong
                                        className="product-name"
                                        style={{
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          display: "inline-block",
                                          maxWidth: "12ch",
                                        }}
                                      >
                                        {item.prod_name}
                                      </strong>

                                      <div>QTY: {item.total_quantity}</div>
                                      {item.total_quantity > 1 ? (
                                        <div>EACH: PHP {item.prod_price}</div>
                                      ) : (
                                        <div>&nbsp;</div>
                                      )}

                                      <br />
                                      <span className="price">
                                        PHP {item.total_price}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ol>

                              {localStorage.getItem("logged_username") ? (
                                <>
                                  <p className="cart-subtotal">
                                    <span className="label">Total:</span>
                                    <span
                                      className="price"
                                      style={{ color: "#E34444" }}
                                    >
                                      PHP {totalPrice}
                                    </span>
                                  </p>
                                  {cartItems.length > 0 && (
                                    <div className="actions">
                                      <a
                                        className="button"
                                        href="/shoppingcart"
                                      >
                                        <span>
                                          <span>Edit / Check out</span>
                                        </span>
                                      </a>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="actions">
                                  <a className="button" href="/login">
                                    <span>
                                      <span>Login First</span>
                                    </span>
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
