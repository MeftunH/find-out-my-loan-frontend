import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthenticationService from "../api/AuthenticationService";
import Swal from 'sweetalert2'
import { Navigate } from "react-router-dom";

const schema = Yup.object().shape({
  identityNo: Yup.string()
    .required("Identity No is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits'),
  password: Yup.string()
    .required("Password is a required field")
    .min(3, "Password must be at least 3 characters"),
});

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      testState: "initialState"
    }
  }
  handleClick(){
    this.setState({
      testState: "newState"
    })
  }
  handleResponse(response){
    sessionStorage.setItem('token',response.data.data);
    sessionStorage.setItem('isLoggedOn',true);
  }
  handleError(response){
    Swal.fire({
      title: 'Error!',
      text: 'Credentials are not matching',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
    render() {

      if (sessionStorage.getItem('token')) {
       return <Navigate to="/homepage"></Navigate>
      }

        return (
          <Formik
          validationSchema={schema}
          initialValues={{ identityNo: "", password: "" }}
          onSubmit={(values) => {
            AuthenticationService.login(values.identityNo,values.password)
            .then(response=>this.handleResponse(response))
            .catch(error=>this.handleError(error))
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
            <div className="login">
              <div className="form">
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
                </form>
              </div>
            </div>
          )}
        </Formik>
        );
    }
}
export default Login;