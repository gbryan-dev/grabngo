import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiEndpoints from '../api_endpoints';
import Header from '../Header';
import Footer from '../Footer';

const RegisterSchema = Yup.object().shape({
  cust_username: Yup.string().required('Username is required'),
  cust_password: Yup.string().required('Password is required'),
  cust_fullname: Yup.string().required('Full Name is required'),
  cust_email: Yup.string().email('Invalid email').required('Email is required'),
});

function App() {
  const [registerMessage, setRegisterMessage] = useState('');
 
  const handleRegisterSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(apiEndpoints.find(endpoint => endpoint.name === 'register').url, values);
      setRegisterMessage(response.data.message);
      resetForm();
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header />
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
         <div className="box" style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
    <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Register</h2>
    <Formik
      initialValues={{ cust_username: '', cust_password: '', cust_fullname: '', cust_email: '' }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegisterSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="registerUsername" className="form-label">Username</label>
            <Field type="text" className="form-control" id="registerUsername" name="cust_username" />
            <ErrorMessage name="cust_username" component="div" className="text-danger" />
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label">Password</label>
            <Field type="password" className="form-control" id="registerPassword" name="cust_password" />
            <ErrorMessage name="cust_password" component="div" className="text-danger" />
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="registerFullName" className="form-label">Full Name</label>
            <Field type="text" className="form-control" id="registerFullName" name="cust_fullname" />
            <ErrorMessage name="cust_fullname" component="div" className="text-danger" />
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="registerEmail" className="form-label">Email</label>
            <Field type="email" className="form-control" id="registerEmail" name="cust_email" />
            <ErrorMessage name="cust_email" component="div" className="text-danger" />
          </div>
          <br />
          <button type="submit" className="btn btn-danger" disabled={isSubmitting} style={{ float: 'right' }}>Register</button>

        </Form>
      )}
    </Formik>
    {registerMessage && <div className="mt-3 text-info" style={{ color: '#e34444'}}>{registerMessage}</div>}
  </div>
</div>

      <Footer />
    </>
  );
}

export default App;
