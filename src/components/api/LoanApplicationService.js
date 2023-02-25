import React from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class LoanApplication {
  loanApply(suretyName, suretySurname,suretyType,suretyIdentityNo,suretyBirthDate,suretyPhoneNumber,suretyPersonType,paybackGuaranteeType,collateralType,collateralWorth ){
   const data = {
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
   }
   Object.keys(data).forEach(key => {
    if (data[key] === "" || data[key]===true || data[key]===false) {
      delete data[key];
    }
  });
   const url="/api/v1/loan/apply";
   return axios.post(url,data);
  }
}

export default new LoanApplication();