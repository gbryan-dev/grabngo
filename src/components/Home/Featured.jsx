import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import apiEndpoints from "../api_endpoints";

function Featured() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          apiEndpoints.find((endpoint) => endpoint.name === "get_featuredprods")
            .url
        );
        setFeatured(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFeaturedProducts();
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
      style={{ margin: "0 0 0px", minHeight: "auto" }}
    >
      <div className="container">
        <div className="sns-products-list">
          <div className="row">
            <div className="col-md-12">
              <div className="block-title">
                <h3>FEATURED PRODUCTS</h3>
              </div>
            </div>
            <div
              id="products_small"
              className="products-small owl-carousel owl-theme"
              style={{ display: "inline-block" }}
            >
              {featured.map((product) => (
                <div
                  className="item"
                  key={product.Product_ID}
                  style={{ minWidth: "250px", maxWidth: "250px" }}
                >
                  <div className="item-inner">
                    <div className="prd">
                      <div className="item-img clearfix">
                        <a
                          className="product-image have-additional"
                          title={product.prod_name}
                          href={`/viewproduct/${product.prod_category}/${product.Product_ID}`}
                        >
                          <span className="img-main">
                            <img
                              src={`/src/images/products/${product.prod_img}`}
                              alt={product.prod_name}
                            />
                          </span>
                        </a>
                      </div>
                      <div className="item-info">
                        <div className="info-inner">
                          <div className="item-title">
                            <a
                              title={product.prod_name}
                              href={`/viewproduct/${product.prod_category}/${product.Product_ID}`}
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
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="action-bot">
                          <div className="wrap-addtocart">
                            {localStorage.getItem("logged_username") ? (
                              <button
                                className="btn-cart"
                                title="Add to Cart"
                                onClick={() => addToCart(product)}
                              >
                                <i className="ph ph-shopping-cart"></i>
                                <span>&nbsp;&nbsp;&nbsp;Add to Cart</span>
                              </button>
                            ) : (
                              <div style={{ cursor: "pointer" }}>
                                <a
                                  href="/login"
                                  className="btn-cart"
                                  title="Add to Cart"
                                >
                                  <i className="ph ph-user"></i>
                                  <span>&nbsp;&nbsp;&nbsp;Login First</span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
