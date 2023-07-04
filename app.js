///////////////////////////////////////////////////////////
//////////////////// PAYMENT //////////////////////////////
///////////////////////////////////////////////////////////

const express = require("express");
const request = require("request");
const path = require("path");
// const bodyParser = require("body-parser");
const app = express();
// require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // on app save
  console.log(`Server radi on: http://localhost:${PORT}`)
});

app.get("/", (req, res) => {
  res.render("index");
});

// let token;

app.get("/pay_test", (req, res) => {

  let options_test = {
    method: "POST",
    url: "https://test.merchantsafeunipay.com/msu/api/v2",
    headers: {
      "content-type": "multipart/form-data",
    },
    form: {
      ACTION: "SESSIONTOKEN",
      MERCHANTUSER: "npavlovi@nassan.rs", // TEST
      MERCHANTPASSWORD: "+5UQ8@NDVm@*=r3", // TEST
      MERCHANT: "ems02", // TEST
      CUSTOMER: "Customer-UCUoumJV",
      SESSIONTYPE: "PAYMENTSESSION",
      MERCHANTPAYMENTID: new Date(),
      AMOUNT: "12345.00",
      CURRENCY: "RSD",
      CUSTOMEREMAIL: "email@email.com",
      CUSTOMERNAM: "Ime",
      CUSTOMERPHONE: "123456789",
      RETURNURL: "https://shop-node.milosdjokovic.com/succesfull",
      SESSIONEXPIRY: "1h",
    },
  };

  request(options_test, (err, response) => {
    let test_token = JSON.parse(response.body).sessionToken;
    console.log(token)
    // on enpoint call
    res.redirect(`https://test.merchantsafeunipay.com/chipcard/pay3d/${test_token}`) // TEST
  });

});

app.get("/pay_ent", (req, res) => {

  let options_ent = {
    method: "POST",
    url: "https://entegrasyon.asseco-see.com.tr/msu/api/v2",
    headers: {
      "content-type": "multipart/form-data",
    },
    form: {
      ACTION: "SESSIONTOKEN",
      MERCHANTUSER: "api.test@payten.com", // INTEGRACIJA
      MERCHANTPASSWORD: "Hephr=R4SKNycaLf", // INTEGRACIJA
      MERCHANT: "chipcardtest01", // INTEGRACIJA
      CUSTOMER: "Customer-UCUoumJV",
      SESSIONTYPE: "PAYMENTSESSION",
      MERCHANTPAYMENTID: new Date(),
      AMOUNT: "12345.00",
      CURRENCY: "RSD",
      CUSTOMEREMAIL: "email@email.com",
      CUSTOMERNAM: "Ime",
      CUSTOMERPHONE: "123456789",
      RETURNURL: "https://shop-node.milosdjokovic.com/succesfull",
      SESSIONEXPIRY: "1h",
      MAXINSTALLMENTCOUNT: 3
    },
  };



  request(options_ent, (err, response) => {
    if (err) throw new Error(err);
    let ent_token = JSON.parse(response.body).sessionToken;

    // errCode = JSON.parse(response.body).errorCode;
    // on enpoint call
    res.redirect(`https://entegrasyon.asseco-see.com.tr/chipcard/pay3d/${ent_token}`) // INTEGRACIJA
  });

});

app.get("/pay_cse", (req, res) => {


  let options_cse = {
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
      MERCHANTPAYMENTID: new Date(),
      AMOUNT: "1000.00",
      CURRENCY: "RSD",
      CUSTOMEREMAIL: "email@email.com",
      CUSTOMERNAM: "Ime",
      CUSTOMERPHONE: "123456789",
      RETURNURL: "http://localhost:3000/succesfull",
      EXTRA: {
        cardSave: "YES",
      },
      // PGTRANID: "19045KYdF14165",
    },
  };



  request(options_cse, (err, response) => {
    if (err) throw new Error(err);
    let cse_token = JSON.parse(response.body).sessionToken;
    res.render("cse", { token: cse_token });

    // errCode = JSON.parse(response.body).errorCode;
    // on enpoint call
    // res.redirect(`https://entegrasyon.asseco-see.com.tr/chipcard/pay3d/${token}`) // INTEGRACIJA
  });

});

// app.get("/pay_ent_rate", (req, res) => {
//   request(options_ent, (err, response) => {
//     if (err) throw new Error(err);
//     token = JSON.parse(response.body).sessionToken;

//     request(options_ent_rate, (err, response) => {
//       if (err) throw new Error(err);
//       res.redirect(`https://entegrasyon.asseco-see.com.tr/chipcard/pay3d/${token}`) // INTEGRACIJA
//     });

//     res.redirect(`https://entegrasyon.asseco-see.com.tr/chipcard/pay3d/${token}`) // INTEGRACIJA
//   });

// });

let options_2 = {
  method: "POST",
  url: `https://test.merchantsafeunipay.com/msu/api/v2`,
  headers: {
    "content-type": "multipart/form-data",
  },
  form: {

    ACTION: "QUERYTRANSACTION",
    // SESSIONTOKEN: token,
  },
};

app.get("/qty", (req, res) => {
  // on enpoint call
  console.log(errCode);
  // res.send(response);
});







app.post("/succesfull", (req, res) => {
  res.render("success", {
    ishod: res.body,
    // brTrans: res.body,
  });
  console.log(JSON.parse(response.body))
});

///////////////////////////////////////////////
///////////////////////////////////////////////

///////////////////////////////////////////////////////////
//////////////////// REACT IZVESTAJ //////////////////////////////
///////////////////////////////////////////////////////////

// const request = require('request');
// let options = {
//   'method': 'POST',
//   'url': 'http://utms-da-reporting.payten.mk.local:31672/api/generate-report',
//   'headers': {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     "reportType": "installed files",
//     "order": null,
//     "delimiter": ",",
//     "timeZone": "Europe/Paris",
//     "properties": {
//       "profileId": "DG000068,DG000169,DG000741,DG000601,DG000835,DG000429,DG000205,DG000287,DG000421,BPS00487,MK000129,MK000224,INA00127,INA00042,INA00067,INA00100",
//       "serial": null,
//       "profileIdContains": null,
//       "serialContains": null,
//       "fromTimestamp": "2023-03-01T23:00:00.000Z",
//       "toTimestamp": "2023-04-18T17:00:52.000Z",
//       "latestVersion": true,
//       "pivot": true,
//       "file": "castles.ctms.service,com.payten.devicemanager,com.payten.devicemanagerinstaller,com.payten.dminstaller,com.payten.paytenapos,com.payten.service",
//       "fileContains": null,
//       "profileIdErrorMsg": null
//     }
//   })

// };
// request(options, (error, response) => {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });




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
//       MERCHANTPAYMENTID: "User5",
//       AMOUNT: "10.00",
//       CURRENCY: "RSD",
//       CUSTOMEREMAIL: "email@email.com",
//       CUSTOMERNAM: "Ime",
//       CUSTOMERPHONE: "123456789",
//       RETURNURL: "http://localhost:6600/succesfull",
// };
// const customHeaders = {
//     "Content-Type": "multipart/form-data",
//     // "Content-Type": "application/json",
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
