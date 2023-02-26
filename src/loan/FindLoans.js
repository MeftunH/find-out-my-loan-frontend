import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

const validationSchema = Yup.object().shape({
  identityNo: Yup.string()
    .required("Identity Number is required")
    .matches(/^\d{11}$/, "Identity Number must be 11 digits"),
  birthDate: Yup.string()
    .required("Birth Date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birth Date must be in YYYY-MM-DD format"),
});

function FindLoans() {
  const [loans, setLoans] = useState("");
  const handleParameterChange = (newParameter) => {
    setLoans(newParameter);
  };
  const handleResponse = (response) => {
    setLoans(response.data.data);
    handleParameterChange(response.data.data);
  };

  const handleError = (response) => {
    Swal.fire({
      title: response,
      text: response,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          identityNo: "",
          birthDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const url =
            "/api/v1/customer/" +
            values.identityNo +
            "/" +
            values.birthDate +
            "/find-loans";
          console.log(sessionStorage.getItem("token"));
          console.log(url);
          return axios
            .get(url, {
              headers: {
                Authorization: sessionStorage.getItem("token"), // replace with your authorization header value
                "Content-Type": "application/json", // replace with your content type header value
              },
            })
            .then((response) => handleResponse(response))
            .catch((error) => handleError(error));
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div>
              <label htmlFor="identityNo">Identity Number:</label>
              <Field type="text" id="identityNo" name="identityNo" />
              {errors.identityNo && touched.identityNo && (
                <div>{errors.identityNo}</div>
              )}
            </div>
            <div>
              <label htmlFor="birthDate">Birthdate:</label>
              <Field type="string" id="birthDate" name="birthDate" />
              {errors.birthDate && touched.birthDate && (
                <div>{errors.birthDate}</div>
              )}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <br></br>
      <br></br>
      {loans && loans.length > 0 && (
     <table className="w-full border-collapse table-auto">
     <thead>
       <tr className="bg-gray-50">
         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payback Guarantee Type</th>
         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated Date</th>
       </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
       {loans.map((item, index) => (
         <tr key={index}>
           <td className="px-4 py-2 whitespace-nowrap">{item.paybackGuaranteeType}</td>
           <td className="px-4 py-2 whitespace-nowrap">{item.amount}</td>
           <td className="px-4 py-2 whitespace-nowrap">{item.result}</td>
           <td className="px-4 py-2 whitespace-nowrap">{item.baseAdditionalFieldsCreatedDate}</td>
           <td className="px-4 py-2 whitespace-nowrap">{item.baseAdditionalFieldsUpdatedDate}</td>
         </tr>
       ))}
     </tbody>
   </table>
      )}
    </div>
  );
}

export default FindLoans;
