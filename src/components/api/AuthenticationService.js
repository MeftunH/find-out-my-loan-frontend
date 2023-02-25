import React from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class AuthenticationService {
  login(identityNo, password ){
   const data = {
        identityNo: identityNo,
        password: password
   }
   const url="/auth/login";
   return axios.post(url,data);
  }
  logout(){
    axios.defaults.headers.common["Authorization"] = null;
    sessionStorage.clear();
    sessionStorage.setItem('isLoggedOn',false);
    <Navigate to="/login"></Navigate>
  }
  register(name, surname,identityNo,birthDate,phoneNumber,personType,monthlyIncome,password)
  {
    const data={
        name: name,
        surname: surname,
        identityNo: identityNo,
        birthDate: birthDate,
        phoneNumber: phoneNumber,
        personType: personType,
        monthlyIncome: monthlyIncome,
        password: password
    }
    const url="/auth/register";
    return axios.post(url,data);
  }
}

export default new AuthenticationService();