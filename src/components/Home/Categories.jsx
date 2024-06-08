import { useState } from "react";
import Bakery from "../../images/categories/bakery.png";
import Beverage from "../../images/categories/beverage.png";
import CleaningProducts from "../../images/categories/cleaning.png";
import CondimentsAndSauces from "../../images/categories/Condiments and sauces.png";
import DairyProducts from "../../images/categories/Dairy products.jpg";
import FrozenFoods from "../../images/categories/frozenfoods.png";
import FruitsAndVegetables from "../../images/categories/Fruits and Vegetables.webp";
import MeatAndSeafoods from "../../images/categories/meatseafoods.png";
import PantryStaples from "../../images/categories/Pantry Staples.png";
import PersonalProducts from "../../images/categories/Personal products.jpg";
import Snacks from "../../images/categories/Snacks.webp";

import styled from "styled-components";

function Categories() {
  const StyledSuggestItem = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;

    @media (max-width: 768px) {
      display: none;
    }

    .title {
      padding-top: 10px;
    }
  `;

  const [showMenu, setShowMenu] = useState(false);

  const categoriesItem = [
    { src: FruitsAndVegetables, title: "Fruits and Vegetables", link: "#" },
    { src: MeatAndSeafoods, title: "Meat and Seafood", link: "#" },

    { src: DairyProducts, title: "Dairy", link: "#" },
    { src: Bakery, title: "Bakery", link: "#" },
    { src: FrozenFoods, title: "Frozen Foods", link: "#" },
    { src: CondimentsAndSauces, title: "Condiments and Sauces", link: "#" },

    { src: Beverage, title: "Beverages", link: "#" },

    { src: PantryStaples, title: "Pantry Staples", link: "#" },

    { src: Snacks, title: "Snacks", link: "#" },
    { src: CleaningProducts, title: "Cleaning Supplies", link: "#" },

    { src: PersonalProducts, title: "Personal Care", link: "#" },
  ];

  return (
    <>
      <div
        id="sns_content"
        className="wrap layout-m"
        style={{ margin: "0 0 0px", minHeight: "auto" }}
      >
        <div className="container">
          <div className="row">
            <div
              id="sns_main"
              className="col-md-12 col-main"
              style={{ margin: "0 0 0px", minHeight: "auto" }}
            >
              <div id="sns_mainmidle">
                <div id="sns_producttaps1" className="sns_producttaps_wraps">
                  <div id="sns_suggest12" className="sns_suggest">
                    <div className="block-title">
                      <h3>OUR CATEGORIES</h3>
                      <i
                        className="fa fa-align-justify"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        {" "}
                        <i className="ph ph-sort-ascending"></i>
                      </i>

                      {showMenu && (
                        <div>
                          <div
                            style={{
                              listStyle: "none",
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                          >
                            {categoriesItem.map((item, index) => (
                              <div
                                key={index}
                                style={{
                                  width: "90px",
                                  height: "150px",
                                  padding: "10px",
                                  margin: "0px",
                                }}
                              >
                                <img src={item.src} alt={item.title} />

                                <div
                                  className="title"
                                  style={{ textAlign: "center" }}
                                >
                                  <a href={item.title}>{item.title}</a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="suggest-content"
                      style={{ display: "flex", flexWrap: "nowrap" }}
                    >
                      {categoriesItem.map((item, index) => (
                        <StyledSuggestItem className="suggest-item" key={index}>
                          <a href={`allProducts/${item.title}`}>
                            <img
                              src={item.src}
                              alt={item.title}
                              style={{ width: "100%", height: "60%" }}
                            />
                            <div className="title">
                              <a href={`allProducts/${item.title}`}>
                                {item.title}
                              </a>
                            </div>
                          </a>
                        </StyledSuggestItem>
                      ))}
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

export default Categories;
