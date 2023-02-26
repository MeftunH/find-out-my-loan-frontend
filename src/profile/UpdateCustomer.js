import React, { useState,useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import CustomerService from "../components/api/CustomerService";
import { Link } from "react-router-dom";
import DeleteAccountButton from "./DeleteAccountButton";



const schema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  surname: Yup.string().required("Surname is a required field"),
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
  monthlyIncome: Yup.number().required("Monthly Income is a required field"),
});

function UpdateCustomer() {
    const [isUpdated, setIsUpdated] = useState(false);
    const [initialValues, setInitialValues] = useState({
      name: "",
      surname: "",
      identityNo: "",
      birthDate: "",
      phoneNumber: "",
      personType: "",
      monthlyIncome: "",
      customerLimit: "",
    });
  
    useEffect(() => {
      const url = "/api/v1/customer";
      axios
        .get(url, {
          headers: {
            Authorization: sessionStorage.getItem("token"), // replace with your authorization header value
            "Content-Type": "application/json", // replace with your content type header value
          },
        })
        .then((response) => {
          const {
            name,
            surname,
            phoneNumber,
            identityNo,
            birthDate,
            personType,
            monthlyIncome,
            customerLimit,
          } = response.data.data.value;
          setInitialValues({
            name,
            surname,
            phoneNumber,
            identityNo,
            birthDate,
            personType,
            monthlyIncome,
            customerLimit,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    const handleResponse = (response) => {
      
      setIsUpdated(true);
      Swal.fire({
        title: "Success!",
        text: "Record has been updated.",
        icon: "success",
        confirmButtonText: "OK",
      });
      window.location.href = "/apply-loan";
    };
  
    const handleError = (error) => {
      setIsUpdated(false);
      Swal.fire({
        title: error.response.data.data.message,
        text: error.response.data.data.detail,
        icon: "info",
        confirmButtonText: "OK",
      });
    };
  
    if (!initialValues) {
      return <div>Loading...</div>;
    }
  
    return (
        console.log(initialValues),
      <div className="update-page">
        {isUpdated ? (
          <p>Record has been updated successfully.</p>
        ) : (
          <Formik
            validationSchema={schema}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values) => {
                CustomerService.updateCustomer(values.name,
                    values.surname,
                    values.phoneNumber,
                    values.identityNo,
                    values.birthDate,
                    values.personType,
                    values.monthlyIncome,
                    values.customerLimit)
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
            })=> (
          <form className="form" onSubmit={handleSubmit}>
              <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Your Account Limit:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                disabled={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.customerLimit}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="surname"
              >
                Surname
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="surname"
                type="text"
                name="surname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
              />
              {errors.surname && touched.surname && (
                <p className="text-red-500 text-xs italic">{errors.surname}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="monthlyIncome"
              >
                Monthly Income
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="monthlyIncome"
                type="text"
                name="monthlyIncome"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.monthlyIncome}
              />
              {errors.monthlyIncome && touched.monthlyIncome && (
                <p className="text-red-500 text-xs italic">{errors.monthlyIncome}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
          )}
        </div>
      );
    }
    
    export default UpdateCustomer;