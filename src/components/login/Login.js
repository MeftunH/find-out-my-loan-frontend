import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthenticationService from "../api/AuthenticationService";
import Swal from "sweetalert2";
import logo from '../../assets/find-out-my-loan.png';
const schema = Yup.object().shape({
  identityNo: Yup.string()
    .required("Identity No is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits"),
  password: Yup.string()
    .required("Password is a required field")
    .min(3, "Password must be at least 3 characters"),
});

function Login() {
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  useEffect(() => {
    console.log(isLoggedOn);
    if (isLoggedOn) {
      window.location.href = "/apply-loan";
    }
  });

  const handleResponse = (response) => {
    sessionStorage.setItem("token", response.data.data);
    console.log(response.data.data);
    sessionStorage.setItem("isLoggedOn", true);
    setIsLoggedOn(true);
  };
  const handleError = (response) => {
    setIsLoggedOn(false);
    Swal.fire({
      title: response.response.data.data.message,
      text: response.response.data.data.detail,
      icon: "info",
      confirmButtonText: "OK",
    });
  };
  return (
    <Formik
      validationSchema={schema}
      initialValues={{ identityNo: "", password: "" }}
      onSubmit={(values) => {
        AuthenticationService.login(values.identityNo, values.password)
          .then((response) => handleResponse(response))
          .catch((error) => handleError(error));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
      
          <div className="form">
        <img src={logo}/>

            {/* Passing handleSubmit parameter tohtml form onSubmit property */}
            <form noValidate onSubmit={handleSubmit}>
              <span>Login</span>
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
              <input
                type="number"
                min="1"
                name="identityNo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.identityNo}
                placeholder="Enter identity No"
                className="form-control inp_text"
                id="identityNo"
              />
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.identityNo && touched.identityNo && errors.identityNo}
              </p>
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter password"
                className="form-control"
              />
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.password && touched.password && errors.password}
              </p>
            
              {/* Click on submit button to submit the form */}
              <button type="submit">Login</button>
              <p>You haven't an account?</p>
              <a href="/register">Register Now</a>
            </form>
          </div>
       
      )}
    </Formik>
  );
}
export default Login;
