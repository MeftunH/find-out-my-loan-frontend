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
}

export default new AuthenticationService();