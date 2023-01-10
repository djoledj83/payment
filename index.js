const express = require("express");
const request = require("request");
const app = express();

const PORT = 6600;

let options = {
  method: "POST",
  url: "https://entegrasyon.asseco-see.com.tr/msu/api/v2",
  headers: {
    "content-type": "multipart/form-data",
  },
  form: {
    // ACTION: "QUERYCARD",
    // ACTION: "VOID",
    ACTION: "SESSIONTOKEN",
    MERCHANTUSER: "api.test@payten.com",
    MERCHANTPASSWORD: "Hephr=R4SKNycaLf",
    MERCHANT: "chipcardtest01",
    CUSTOMER: "Customer-UCUoumJV",
    SESSIONTYPE: "PAYMENTSESSION",
    MERCHANTPAYMENTID: "User4",
    AMOUNT: "10.00",
    CURRENCY: "RSD",
    CUSTOMEREMAIL: "email@email.com",
    CUSTOMERNAM: "Ime",
    CUSTOMERPHONE: "123456789",
    RETURNURL: "http://localhost:6600/succesfull",
    EXTRA: {
        cardSave: "YES",
      },
    // PGTRANID: "19045KYdF14165",
  },
};

app.listen(PORT, () => {
  // on app save
  request(options, (error, response) => {
    if (error) throw new Error(error);
    // let data = JSON.parse(response.body)
    console.log(JSON.parse(response.body).sessionToken);
    // console.log(JSON.parse(response.body));
  });
  // console.log('Server radi!')
});

app.get("/", (req, res) => {
  // on enpoint call
  request(options, (err, response) => {
    if (err) throw new Error(err);
    // let token = JSON.parse(response.body).sessionToken;
    
    res.redirect(`https://entegrasyon.asseco-see.com.tr/chipcard/pay3d/${JSON.parse(response.body).sessionToken}`)
  });
});

app.post("/succesfull", (req, res) => {
  // on enpoint call
 res.end("Payment succes!")
});


///////////////////////////////////////////////
///////////////////////////////////////////////

///////////////// NACIN SA AXIOSOM //////////////

// const axios = require('axios');
// const url = 'https://entegrasyon.asseco-see.com.tr/msu/api/v2'
// const data = {
//       ACTION: "SESSIONTOKEN",
//       MERCHANTUSER: "api.test@payten.com",
//       MERCHANTPASSWORD: "Hephr=R4SKNycaLf",
//       MERCHANT: "chipcardtest01",
//       CUSTOMER: "Customer-UCUoumJV",
//       SESSIONTYPE: "PAYMENTSESSION",
//       MERCHANTPAYMENTID: "User12345",
//       AMOUNT: "10.00",
//       CURRENCY: "RSD",
//       CUSTOMEREMAIL: "email@email.com",
//       CUSTOMERNAM: "Ime",
//       CUSTOMERPHONE: "123456789",
//       RETURNURL: "http://localhost:6600/succesfull",
// };
// const customHeaders = {
//     "Content-Type": "multipart/form-data",
// }

// axios.post(url, data, {
//   headers: customHeaders,
// })
// .then(({ data }) => {
//   console.log(data.sessionToken);
// })
// .catch((error) => {
//   console.error(error);
// });

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
////////////////// NACIN SA FETCH ////////////////////////


// const url = 'https://entegrasyon.asseco-see.com.tr/msu/api/v2'
// const data = {
//       ACTION: "SESSIONTOKEN",
//       MERCHANTUSER: "api.test@payten.com",
//       MERCHANTPASSWORD: "Hephr=R4SKNycaLf",
//       MERCHANT: "chipcardtest01",
//       CUSTOMER: "Customer-UCUoumJV",
//       SESSIONTYPE: "PAYMENTSESSION",
//       MERCHANTPAYMENTID: "User12345",
//       AMOUNT: "10.00",
//       CURRENCY: "RSD",
//       CUSTOMEREMAIL: "email@email.com",
//       CUSTOMERNAM: "Ime",
//       CUSTOMERPHONE: "123456789",
//       RETURNURL: "http://localhost:6600/succesfull",
// };
// const customHeaders = {
//     "Content-Type": "multipart/form-data",
// }

// fetch(url, {
//     method: "POST",
//     headers: customHeaders,
//     body: JSON.stringify(data),
    
// })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error(error);
//     });