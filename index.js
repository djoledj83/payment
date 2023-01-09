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
    MERCHANTPAYMENTID: "User12",
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