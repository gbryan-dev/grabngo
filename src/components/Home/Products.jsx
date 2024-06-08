import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import apiEndpoints from "../api_endpoints";
import "./styles.css";

function Products() {
  const [products, setProducts] = useState([]);
  const isMobile = window.innerWidth <= 768;

  // Shuffle function to randomize the order of products
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          apiEndpoints.find((endpoint) => endpoint.name === "get_allproducts")
            .url
        );
        const shuffledProducts = shuffleArray(response.data);
        setProducts(shuffledProducts);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const customerID = localStorage.getItem("logged_customerID");
    const cartItem = {
      Product_ID: product.Product_ID,
      Customer_ID: customerID,
      cart_quantity: 1,
      cart_price: product.prod_price,
    };

    try {
      const response = await axios.post(
        apiEndpoints.find((endpoint) => endpoint.name === "add_to_cart").url,
        qs.stringify(cartItem),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data.status === "success") {
        alert("Product added to cart successfully");
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div
      id="sns_content"
      className="wrap layout-m"
      style={{ minHeight: "auto", marginTop: "-10px" }}
    >
      <div className="container">
        <div className="row">
          <div id="sns_main" className="col-md-12 col-main">
            <div id="sns_mainmidle">
              <div id="sns_producttaps1" className="sns_producttaps_wraps">
                <div className="tab-content">
                  <div role="tabpanel" className="tab-pane active" id="home">
                    <div className="products-grid row style_grid">
                      {products.slice(0, 20).map((product) => (
                        <div
                          key={product.Product_ID}
                          className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12"
                          style={
                            isMobile
                              ? { margin: "auto", width: "50%" }
                              : { margin: "auto" }
                          }
                        >
                          <div className="item-inner">
                            <div
                              className="prd"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div>
                                <div className="ico-label">
                                  {product.prod_new === "true" && (
                                    <span className="ico-product ico-new">
                                      New
                                    </span>
                                  )}
                                  {product.prod_sale === "true" && (
                                    <span className="ico-product ico-sale">
                                      Sale
                                    </span>
                                  )}
                                </div>
                                <a
                                  className="product-image have-additional"
                                  href={`/viewproduct/${product.prod_category}/${product.Product_ID}`}
                                >
                                  <span className="img-main">
                                    <img
                                      src={`/src/images/products/${product.prod_img}`}
                                      style={{
                                        maxHeight: "100px",
                                        minHeight: "100px",
                                      }}
                                    />
                                  </span>
                                </a>
                              </div>
                              <div
                                className="item-info"
                                style={{ marginTop: "10px" }}
                              >
                                <div className="info-inner">
                                  <div className="item-title">
                                    <a
                                      title={product.prod_name}
                                      href={`/viewproduct/${product.prod_category}/${product.Product_ID}`}
                                      style={{
                                        whiteSpace: isMobile
                                          ? "normal"
                                          : "nowrap",
                                        overflow: isMobile
                                          ? "visible"
                                          : "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: isMobile ? "none" : "10ch",
                                        display: "inline-block",
                                      }}
                                    >
                                      {product.prod_name}
                                    </a>
                                  </div>
                                  <div className="item-price">
                                    <div className="price-box">
                                      <span className="regular-price">
                                        <span className="price">
                                          <span className="price1">
                                            PHP {product.prod_price}
                                          </span>
                                          {product.prod_sale === "true" && (
                                            <span className="price2">
                                              {product.prod_oldprice}
                                            </span>
                                          )}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="action-bot"
                                style={{ height: "40px" }}
                              >
                                <div
                                  className="wrap-addtocart"
                                  style={{ marginTop: "0px" }}
                                >
                                  {localStorage.getItem("logged_username") ? (
                                    <button
                                      className="btn-cart"
                                      title="Add to Cart"
                                      onClick={() => addToCart(product)}
                                    >
                                      <i className="fa fa-shopping-cart"></i>
                                      <span>Add to Cart</span>
                                    </button>
                                  ) : (
                                    <a
                                      href="/login"
                                      className="btn-cart"
                                      title="Login First"
                                    >
                                      <i className="fa fa-shopping-cart"></i>
                                      <span>Login First</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <a href="/allProducts">
                  <h3 className="bt-more">
                    <span>Display all products</span>
                  </h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
