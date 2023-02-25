import React from 'react'
import axios from 'axios';

class AuthenticationService {
  login(identityNo, password ){
   const data = {
        identityNo: identityNo,
        password: password
   }
   const url="/auth/login";
   return axios.post(url,data);
  }
}

export default new AuthenticationService();