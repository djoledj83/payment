// import express from "express";
// const express = require("express");
// const request = require("request");
// var FormData = require("form-data");
// var data = new FormData();
// const app = express();
// const PORT = 6600;

// const { response } = require("express");

// let options = {
//   method: "POST",
//   url: "https://entegrasyon.asseco-see.com.tr/msu/api/v2",
//   headers: {
//     "content-type": "multipart/form-data",
//   },
//   form: {
//     ACTION: "SESSIONTOKEN",
//     MERCHANTUSER: "api.test@payten.com",
//     MERCHANTPASSWORD: "Hephr=R4SKNycaLf",
//     MERCHANT: "chipcardtest01",
//     CUSTOMER: "Customer-UCUoumJV",
//     SESSIONTYPE: "PAYMENTSESSION",
//     MERCHANTPAYMENTID: "Zicmi12345",
//     AMOUNT: "10.00",
//     CURRENCY: "TRY",
//     CUSTOMEREMAIL: "email@email.com",
//     CUSTOMERNAM: "Ime",
//     CUSTOMERPHONE: "123456789",
//     RETURNURL: "{##### vas return url ######}",
//   },
// };

// app.listen(PORT, () => {
//   // on app save
//   request(options, (error, response) => {
//     if (error) throw new Error(error);
//     console.log(response.body)
//   });
// });

// app.get("/", (req, res) => {
//   // on enpoint call
//   request(options, (error, response) => {
//     if (error) throw new Error(error);
//   }).pipe(res);
// });

//////////////////////////////////////////////////////////////////////////

// let options = {
//     'method': 'POST',
//     'url': 'https://entegrasyon.asseco-see.com.tr/msu/api/v2',
//     'headers': {
//       'Cookie': 'JSESSIONID=B65E952FD1CA9FB25A616523BDBE9343; Apache=91.239.151.39.1672132350622202'
//     },
//     formData: {
//       'ACTION': 'SESSIONTOKEN',
//       'MERCHANTUSER': 'api.test@payten.com',
//       'MERCHANTPASSWORD': 'Hephr=R4SKNycaLf',
//       'MERCHANT': 'chipcardtest01',
//       'CUSTOMER': 'Customer-UCUoumJV',
//       'SESSIONTYPE': 'PAYMENTSESSION',
//       'MERCHANTPAYMENTID': 'Zicmi123',
//       'AMOUNT': '10.00',
//       'CURRENCY': 'TRY',
//       'CUSTOMEREMAIL': 'email@email.com',
//       'CUSTOMERNAME': 'Ime',
//       'CUSTOMERPHONE': '123456789',
//       'RETURNURL': '{##### vas return url ######}',
//       'SESSIONTYPE': '60'
//     }
//   };
//   request(options, (error, response) => {
//     if (error) throw new Error(error);
//     console.log(response.body);
//   });

// app.post('https://entegrasyon.asseco-see.com.tr/msu/api/v2', (req, res) => {
//     req.send({
//         formData: {
//             'ACTION': 'SESSIONTOKEN',
//             'MERCHANTUSER': 'api.test@payten.com',
//             'MERCHANTPASSWORD': 'Hephr=R4SKNycaLf',
//             'MERCHANT': 'chipcardtest01',
//             'CUSTOMER': 'Customer-UCUoumJV',
//             'SESSIONTYPE': 'PAYMENTSESSION',
//             'MERCHANTPAYMENTID': 'Zicmi123',
//             'AMOUNT': '10.00',
//             'CURRENCY': 'TRY',
//             'CUSTOMEREMAIL': 'email@email.com',
//             'CUSTOMERNAME': 'Ime',
//             'CUSTOMERPHONE': '123456789',
//             'RETURNURL': '{##### vas return url ######}',
//             'SESSIONTYPE': '60'
//           }
//     });
// })
// app.get('/payment', (req, res) => {
//     res.send({
//         formData: {
//             'ACTION': 'SESSIONTOKEN',
//             'MERCHANTUSER': 'api.test@payten.com',
//             'MERCHANTPASSWORD': 'Hephr=R4SKNycaLf',
//             'MERCHANT': 'chipcardtest01',
//             'CUSTOMER': 'Customer-UCUoumJV',
//             'SESSIONTYPE': 'PAYMENTSESSION',
//             'MERCHANTPAYMENTID': 'Zicmi123',
//             'AMOUNT': '10.00',
//             'CURRENCY': 'TRY',
//             'CUSTOMEREMAIL': 'email@email.com',
//             'CUSTOMERNAME': 'Ime',
//             'CUSTOMERPHONE': '123456789',
//             'RETURNURL': '{##### vas return url ######}',
//             'SESSIONTYPE': '60'
//           }
//     });
// })

/////////////////////////////////////////////////////////////////////////////////////
/////////////// RADNA //////////////////////

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
    MERCHANTPAYMENTID: "AnaBanana",
    AMOUNT: "10.00",
    CURRENCY: "RSD",
    CUSTOMEREMAIL: "email@email.com",
    CUSTOMERNAM: "Ime",
    CUSTOMERPHONE: "123456789",
    RETURNURL: "http://localhost:6600/succesfull",
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



//////////////////////////////////////////
///////////////// PROBNA  https://entegrasyon.asseco-see.com.tr/chipcard/pay3d/


