import React from "react";
import { Formik, Form, Field } from "formik";
import "../style/LoanApplication.css";
import LoanApplicationService from "../components/api/LoanApplicationService";
import Swal from "sweetalert2";

function LoanApplication() {
  const initialValues = {
    surety: false,
    collateral: false,
    suretyName: "",
    suretySurname: "",
    suretyType: "",
    suretyIdentityNo: "",
    suretyBirthDate: "",
    suretyPhoneNumber: "",
    suretyPersonType: "SURETY",
    collateralType: "",
    collateralWorth: "",
    paybackGuaranteeType: "",
  };
  const handleResponse = (response) => {
    Swal.fire(
        "Loan Amount: "+response.data.data.amount  +"\n"+
         "Loan Result: "+response.data.data.result +"\n"+
         "Customer Limit: "+response.data.data.customerLimit
    )

  }
  const handleError = (response) => {
    console.log(response);
  }
  const handleSubmit = (values) => {
    LoanApplicationService.loanApply(
        values.surety,
        values.collateral,
        values.suretyName, values.suretySurname,values.suretyType,values.suretyIdentityNo,
        values.suretyBirthDate,values.suretyPhoneNumber,values.suretyPersonType,values.collateralType,
        values.collateralWorth,values.paybackGuaranteeType)
    .then((response) => handleResponse(response))
    .catch((error) => handleError(error));
    console.log(values);
  };

  const handleSuretyChange = (values, setFieldValue) => {
    setFieldValue("surety", !values.surety);
    if (!values.surety) {
      setFieldValue("collateral", false);
    }
  };

  const handleCollateralChange = (values, setFieldValue) => {
    setFieldValue("collateral", !values.collateral);
    if (values.collateral) {
      setFieldValue("surety", true);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (values.surety) {
      if (!values.suretyName) {
        errors.suretyName = "Required";
      }
      if (!values.suretySurname) {
        errors.suretySurname = "Required";
      }
      if (!values.suretyType) {
        errors.suretyType = "Required";
      }
      if (!values.suretyIdentityNo) {
        errors.suretyIdentityNo = "Required";
      }
      if (!values.suretyBirthDate) {
        errors.suretyBirthDate = "Required";
      }
      if (!values.suretyPhoneNumber) {
        errors.suretyPhoneNumber = "Required";
      }
    }
    if (values.collateral) {
      if (!values.collateralType) {
        errors.collateralType = "Required";
      }
      if (!values.collateralWorth) {
        errors.collateralWorth = "Required";
      }
    }
    return errors;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="form"> 
          <label>
            Surety
            <Field type="checkbox" name="surety" checked={values.surety} onChange={() => handleSuretyChange(values, setFieldValue)} />
          </label>
          <label>
            Collateral
            <Field type="checkbox" name="collateral" checked={values.collateral} onChange={() => handleCollateralChange(values, setFieldValue)} />
          </label>

          {values.surety && (
            <>
              <label>
                Surety Name
                <Field type="text" name="suretyName" />
                {errors.suretyName && touched.suretyName && <div>{errors.suretyName}</div>}
              </label>

              <label>
                Surety Surname
                <Field type="text" name="suretySurname" />
                {errors.suretySurname && touched.suretySurname && <div>{errors.suretySurname}</div>}
              </label>
              <label class="block mt-4">
  <h6 class="text-gray-700">Surety Type</h6>
  <div class="mt-1">
    <Field as="select" name="suretyType" class="block w-full px-4 py-2 pr-8 leading-tight border-gray-400 rounded appearance-none focus:outline-none focus:shadow-outline">
      <option value=""></option>
      <option value="JOINT">JOINT</option>
      <option value="ORDINARY">ORDINARY</option>
      <option value="CO_GUARANTEES">CO_GUARANTEES</option>
    </Field>
  </div>
  {errors.suretyType && touched.suretyType && <div class="mt-1 text-red-500">{errors.suretyType}</div>}
</label>

              <label>
            Surety Identity No
            <Field type="text" name="suretyIdentityNo" />
            {errors.suretyIdentityNo && touched.suretyIdentityNo && <div>{errors.suretyIdentityNo}</div>}
          </label>

          <label>
            Surety Birth Date
            <Field type="text" name="suretyBirthDate" />
            {errors.suretyBirthDate && touched.suretyBirthDate && <div>{errors.suretyBirthDate}</div>}
          </label>

          <label>
            Surety Phone Number
            <Field type="text" name="suretyPhoneNumber" />
            {errors.suretyPhoneNumber && touched.suretyPhoneNumber && <div>{errors.suretyPhoneNumber}</div>}
          </label>

       
        </>
      )}

      {values.collateral && (
        <>
                 <label class="block mt-4">
  <h6 class="text-gray-700">Collateral Type</h6>
  <div class="mt-1">
    <Field as="select" name="collateralType" class="block w-full px-4 py-2 pr-8 leading-tight border-gray-400 rounded appearance-none focus:outline-none focus:shadow-outline">
      <option value=""></option>
      <option value="CAR">CAR</option>
      <option value="HOUSE">HOUSE</option>
      <option value="MONEY">MONEY</option>
      <option value="OTHER">OTHER</option>
    </Field>
  </div>
  {errors.collateralType && touched.collateralType && <div class="mt-1 text-red-500">{errors.collateralType}</div>}
</label>


          <label>
            Collateral Worth
            <Field type="text" name="collateralWorth" />
            {errors.collateralWorth && touched.collateralWorth && <div>{errors.collateralWorth}</div>}
          </label>
        </>
      )}
       <label class="block mb-4">
       <h6 class="text-gray-700">Payback Guarantee Type</h6>
  <div class="mt-1">
    <Field as="select" name="paybackGuaranteeType" class="block w-full px-4 py-2 pr-8 leading-tight border-gray-400 rounded appearance-none focus:outline-none focus:shadow-outline">
      <option value=""></option>
      <option value="COLLATERAL">COLLATERAL</option>
      <option value="SURETY">SURETY</option>
      <option value="ALL_OF_THEM">ALL OF THEM</option>
    </Field>
  </div>
  {errors.paybackGuaranteeType && touched.paybackGuaranteeType && <div class="text-red-500">{errors.paybackGuaranteeType}</div>}
</label>

      <button type="submit">Submit</button>
    </Form>
  )}
</Formik>

);
};

export default LoanApplication;