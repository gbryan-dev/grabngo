// Import necessary modules from React, Axios, and Formik
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// Import API endpoints
import apiEndpoints from "../api_endpoints";
// Import Header and Footer components
import Header from "../Header";
import Footer from "../Footer";

// Define validation schema for login form
const LoginSchema = Yup.object().shape({
  cust_username: Yup.string().required("Username is required"),
  cust_password: Yup.string().required("Password is required"),
});

// Define App component
function App() {
  // State for login message and navigate function for routing
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  // Handle login form submission
  const handleLoginSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send login request to API
      const response = await axios.post(
        apiEndpoints.find((endpoint) => endpoint.name === "login").url,
        values
      );
      // Log response data and set local storage for logged-in user
      console.log("Response:", response.data);
      if (response.data.message === "Login successful") {
        localStorage.setItem("logged_username", values.cust_username);
        localStorage.setItem("logged_customerID", response.data.Customer_ID);
        navigate("/home"); // Redirect to home page on successful login
      }
      setLoginMessage(response.data.message); // Set login message
      resetForm(); // Reset form fields
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false); // Set submitting state to false
  };

  // Render login form
  return (
    <>
      <Header /> {/* Render Header component */}
      {/* Container for login form */}
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        {/* Box containing the form */}
        <div
          className="box"
          style={{
            width: "400px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Login</h2>
          {/* Formik wrapper for login form */}
          <Formik
            initialValues={{ cust_username: "", cust_password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Username input field */}
                <div className="mb-3">
                  <label htmlFor="loginUsername" className="form-label">
                    Username
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="loginUsername"
                    name="cust_username"
                  />
                  {/* Display error message if username is not provided */}
                  <ErrorMessage
                    name="cust_username"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <br />
                {/* Password input field */}
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    name="cust_password"
                  />
                  {/* Display error message if password is not provided */}
                  <ErrorMessage
                    name="cust_password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <br />
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isSubmitting}
                  style={{ float: "right" }}
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
          {/* Display login message */}
          {loginMessage && (
            <div className="mt-3 text-info" style={{ color: "#e34444" }}>
              {loginMessage}
            </div>
          )}
        </div>
      </div>
      <Footer /> {/* Render Footer component */}
    </>
  );
}

export default App; // Export App component
