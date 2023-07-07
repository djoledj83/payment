///////////////////////////////////////////////////////////
//////////////////// PAYMENT //////////////////////////////
///////////////////////////////////////////////////////////

const express = require("express");
const request = require("request");
const path = require("path");
const app = express();
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
      AMOUNT: "10000.00",
      CURRENCY: "RSD",
      CUSTOMEREMAIL: "email@email.com",
      CUSTOMERNAM: "Ime",
      CUSTOMERPHONE: "123456789",
      RETURNURL: "https://shop-node.milosdjokovic.com/succesfull",
      SESSIONEXPIRY: "1h",
      EXTRA: {
        cardSave: "YES",
      },
    },
  };

  request(options_test, (err, response) => {
    let test_token = JSON.parse(response.body).sessionToken;
    console.log(test_token);
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
      MAXINSTALLMENTCOUNT: 3,
    },
  };



  request(options_ent, (err, response) => {
    if (err) throw new Error(err);
    let ent_token = JSON.parse(response.body).sessionToken;
    console.log(response.body)

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

app.post("/succesfull", (req, res) => {
  // res.set("Content-Type", "application/json");
  const response = req.body;
  res.render("success", {
    ishod: JSON.stringify(response.pgTranRefId),
    // brTrans: res.body,
  });
});