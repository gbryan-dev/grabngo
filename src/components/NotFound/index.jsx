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
                  fontSize: "14em",
                  textAlign: "center",
                  color: "#e34444",
                }}
              >
                404
              </h1>
              <h2 style={{ textAlign: "center" }}>Page not found</h2>
              <p
                style={{ textAlign: "center", fontSize: "2em", width: "100%" }}
              >
                <div
                  style={{ width: isMobile ? "80%" : "50%", margin: "auto" }}
                >
                  Sorry but the page you are looking for does not exist, have
                  been removed or name changed. Go back Homepage.
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
