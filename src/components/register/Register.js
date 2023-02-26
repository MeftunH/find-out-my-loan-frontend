import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "tailwindcss/tailwind.css"; // import your CSS file
import AuthenticationService from "../api/AuthenticationService";
import Swal from "sweetalert2";
import logo from '../../assets/find-out-my-loan.png';

const initialValues = {
  name: "",
  surname: "",
  identityNo: "",
  birthDate: "",
  phoneNumber: "",
  personType: "CUSTOMER",
  monthlyIncome: "",
  password: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  identityNo: Yup.number()
    .integer("Identity Number must be a whole number")
    .positive("Identity Number must be a positive number")
    .test(
      "len",
      "Identity Number must be exactly 11 digits",
      (val) => val && val.toString().length === 11
    ),
  birthDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .required("Date is required"),
  phoneNumber: Yup.number()
    .positive("Phone number must be a positive number")
    .integer("Phone number must be an integer")
    .typeError("Phone number must be a number")
    .test("len", "Phone number must be exactly 10 digits", (val) => {
      if (val) {
        return val.toString().length === 10;
      }
      return false;
    })
    .required("Phone number is required"),
  monthlyIncome: Yup.number().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(3, "Password must be at least 3 characters"),
});

function Register() {
  const handleResponse = (response) => {
    window.location.href = "/login";
    console.log(response.data.data);
  };
  const handleError = (response) => {
    Swal.fire({
      title: response.data.message,
      text: response.data.detail,
      icon: "error",
      confirmButtonText: "OK",
    });
  };
  const onSubmit = (values, { setSubmitting }) => {
    AuthenticationService.register(
      values.name,
      values.surname,
      values.identityNo,
      values.birthDate,
      values.phoneNumber,
      values.personType,
      values.monthlyIncome,
      values.password
    )
      .then((response) => handleResponse(response))
      .catch((error) => handleError(error));
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="form">
        <img src={logo}/>
          <Form className="bg-white shadow-md rounded-lg px-12 pt-8 pb-8 mb-6 w-full max-w-lg">
            <h2 className="text-2xl text-center mb-6 font-bold text-gray-800">
              Register Form
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                type="text"
                id="name"
                name="name"
              />
              <ErrorMessage name="name" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="surname"
              >
                Surname:
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                type="text"
                id="surname"
                name="surname"
              />
              <ErrorMessage name="surname" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="identityNo"
              >
                Identity Number:
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                type="number"
                id="identityNo"
                name="identityNo"
              />
              <ErrorMessage
                name="identityNo"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="birthDate"
              >
                Birth Date (yyyy-mm-dd):
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="string"
                id="birthDate"
                name="birthDate"
              />
              <ErrorMessage name="birthDate" />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number:
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
              />
              <ErrorMessage
                name="phoneNumber"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="monthlyIncome"
              >
                Monthly Income:
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                type="text"
                id="monthlyIncome"
                name="monthlyIncome"
              />
              <ErrorMessage name="monthlyIncome" />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                type="text"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" />
            </div>

            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="bg-green-500 hover:bg-green-700 text-white content-center font-bold py-2 px-4 rounded mx-auto"
            >
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
export default Register;
