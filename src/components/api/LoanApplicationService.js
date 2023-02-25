import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class LoanApplication {
  loanApply(
    surety,
    collateral,
    suretyName,
    suretySurname,
    suretyType,
    suretyIdentityNo,
    suretyBirthDate,
    suretyPhoneNumber,
    suretyPersonType,
    collateralType,
    collateralWorth,
    paybackGuaranteeType
  ) {
    var data = {
      collateral: collateral,
      surety: surety,
      suretyName: suretyName,
      suretySurname: suretySurname,
      suretyType: suretyType,
      suretyIdentityNo: suretyIdentityNo,
      suretyBirthDate: suretyBirthDate,
      suretyPhoneNumber: suretyPhoneNumber,
      suretyPersonType: suretyPersonType,
      paybackGuaranteeType: paybackGuaranteeType,
      collateralType: collateralType,
      collateralWorth: collateralWorth,
    };
    if (collateral === true) {
      data = {
        paybackGuaranteeType: paybackGuaranteeType,
        collateralType: collateralType,
        collateralWorth: collateralWorth,
      };
    }
    else if(surety===true){
        data = {
            suretyName: suretyName,
            suretySurname: suretySurname,
            suretyType: suretyType,
            suretyIdentityNo: suretyIdentityNo,
            suretyBirthDate: suretyBirthDate,
            suretyPhoneNumber: suretyPhoneNumber,
            suretyPersonType: suretyPersonType,
            paybackGuaranteeType: paybackGuaranteeType,
          };
    } else if(surety===true&&collateral===true){
        data = {
            suretyName: suretyName,
            suretySurname: suretySurname,
            suretyType: suretyType,
            suretyIdentityNo: suretyIdentityNo,
            suretyBirthDate: suretyBirthDate,
            suretyPhoneNumber: suretyPhoneNumber,
            suretyPersonType: suretyPersonType,
            paybackGuaranteeType: paybackGuaranteeType,
            collateralType: collateralType,
            collateralWorth: collateralWorth,
          };
    }
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] === true || data[key] === false) {
        delete data[key];
      }
    });
    const url = "/api/v1/loan/apply";
    return axios.post(url, data, {
      headers: {
        Authorization: sessionStorage.getItem("token"), // replace with your authorization header value
        "Content-Type": "application/json", // replace with your content type header value
      },
    });
  }
}

export default new LoanApplication();
