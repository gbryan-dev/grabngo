// Import necessary modules and styles
import "./styles.css";
import bannermain from "../../images/banner1.png";
import banner1Image from "../../images/banner2.png";
import banner2Image from "../../images/banner3.png";
import banner3Image from "../../images/banner4.png";
import styled from "styled-components";

// Define the App component
const App = () => {
  // Define styled components for the images
  const StyledImage = styled.img`
    height: 595px;
    @media (max-width: 768px) {
      height: 300px;
    }
  `;

  const Banner = styled.div`
    height: 280px;
    display: block;

    @media (max-width: 768px) {
      display: none;
    }
  `;

  // Render the component
  return (
    <div id="sns_slideshow1" className="wrap">
      <div id="header-slideshow">
        <div className="container">
          <div className="row">
            <div className="slideshows col-md-6 col-sm-8">
              <div
                id="slider123"
                className="owl-carousel owl-theme"
                style={{ overflow: "hidden" }}
              >
                <div className="">
                  <a href="/allProducts">
                    <StyledImage src={bannermain} alt="" />;
                  </a>
                </div>
              </div>
            </div>
            <div className="banner-right col-md-6 col-sm-4">
              <Banner
                className="banner6 banner5 dbn col-md-12 col-sm-6"
                id="forImage"
              >
                <a href="/allProducts/Fruits%20and%20Vegetables">
                  <img src={banner1Image} alt="" style={{ height: "300px" }} />
                </a>
              </Banner>

              <div className="banner6 pdno col-md-12 col-sm-12">
                <div
                  className="banner7 banner6  banner5 col-md-6 col-sm-12"
                  id="forImage"
                >
                  <a href="/allProducts/Meat%20and%20Seafood">
                    <img src={banner2Image} alt="" />
                  </a>
                </div>
                <div className="banner8 banner6  banner5 col-md-6 col-sm-12">
                  <a href="/allProducts">
                    <img
                      src={banner3Image}
                      alt=""
                      style={{ height: "285px" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default App;
