import Footer from "../Footer";
import Header from "../Header";

function Index() {
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <Header />
      <div id="sns_content" className="wrap layout-m">
        <div className="container">
          <div className="row">
            <div className="content">
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: isMobile ? "3em" : "10em",
                  textAlign: "center",
                  color: "#e34444",
                }}
              >
                DEV ALLIANCE
              </h1>
              <h2 style={{ textAlign: "center" }}>About Us</h2>
              <p
                style={{ textAlign: "center", fontSize: "2em", width: "100%" }}
              >
                <div
                  style={{ width: isMobile ? "80%" : "50%", margin: "auto" }}
                >
                  We are a student team dedicated to creating a simple and
                  efficient solution for managing grocery inventories, helping
                  small stores streamline processes, reduce waste, and keep
                  shelves stocked.
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
