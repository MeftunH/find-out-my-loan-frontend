import axios from "axios";

class LoanApplication {
  getLoansByIdentityNoAndBirthDay(identityNo, birthDay) {
    console.log(identityNo, birthDay);
    const url = "/api/v1/customer/" + identityNo + "/" + birthDay + "/find-loans";
    return axios.get(url, {
      headers: {
        Authorization: sessionStorage.getItem("token"), // replace with your authorization header value
        "Content-Type": "application/json", // replace with your content type header value
      },
    });
  }
  updateCustomer(
    name,
    surname,
    phoneNumber,
    identityNo,
    birthDate,
    personType,
    monthlyIncome,
    customerLimit
  ) {
    const data = {
      name: name,
      surname: surname,
      phoneNumber: phoneNumber,
      identityNo: identityNo,
      birthDate: birthDate,
      personType: personType,
      monthlyIncome: monthlyIncome,
      customerLimit: customerLimit,
    };
    const url = "/api/v1/customer";
    return axios.put(url, data, {
      headers: {
        Authorization: sessionStorage.getItem("token"), // replace with your authorization header value
        "Content-Type": "application/json", // replace with your content type header value
      },
    });
  }
}

export default new LoanApplication();
