var http = require('http');
const express = require("express");
const request = require("request");
const app = express();
app.set('view engine', 'ejs');


let options = {
    method: "POST",
    // url: "https://entegrasyon.asseco-see.com.tr/msu/api/v2",
    url: "https://test.merchantsafeunipay.com/msu/api/v2",
    headers: {
        "content-type": "multipart/form-data",
    },
    form: {

        ACTION: "SESSIONTOKEN",
        MERCHANTUSER: "npavlovi@nassan.rs", // TEST
        MERCHANTPASSWORD: "+5UQ8@NDVm@*=r3", // TEST
        MERCHANT: "ems02", // TEST
        // MERCHANTUSER: "api.test@payten.com", // INTEGRACIJA
        // MERCHANTPASSWORD: "Hephr=R4SKNycaLf", // INTEGRACIJA
        // MERCHANT: "chipcardtest01", // INTEGRACIJA
        CUSTOMER: "Customer-UCUoumJV",
        SESSIONTYPE: "PAYMENTSESSION",
        MERCHANTPAYMENTID: new Date(),
        AMOUNT: "12345.00",
        CURRENCY: "RSD",
        CUSTOMEREMAIL: "email@email.com",
        CUSTOMERNAM: "Ime",
        CUSTOMERPHONE: "123456789",
        RETURNURL: "http://localhost:6600/qty",
        SESSIONEXPIRY: "1h",
    },
};



app.listen(PORT, () => {
    // on app save
    request(options, (error, response) => {
        if (error) throw new Error(error);
        console.log(JSON.parse(response.body));
        let s_token = JSON.parse(response.body).sessionToken;

        app.get("/", (req, res) => {
            res.render("index");
        })

        app.get("/pay", (req, res) => {
            // on enpoint call
            request(options, (err, response) => {
                if (err) throw new Error(err);
                // let token = JSON.parse(response.body).sessionToken;
                // res.redirect(`https://entegrasyon.asseco-see.com.tr/chipcard/pay3d/${s_token}`) // INTEGRACIJA
                res.redirect(`https://test.merchantsafeunipay.com/chipcard/pay3d/${s_token}`) // TEST
            });
        });


        let options_2 = {
            method: "POST",
            url: `https://test.merchantsafeunipay.com/msu/api/v2`,
            headers: {
                "content-type": "multipart/form-data",
            },
            form: {

                ACTION: "QUERYTRANSACTION",
                SESSIONTOKEN: s_token,
            },
        };



        app.get("/qty", (req, res) => {
            // on enpoint call
            request(options_2, (err, response) => {
                if (err) throw new Error(err);
                res.send(response.body);
                console.log(response.body);

                // res.send(response);
            });
        });
    });
    console.log('Server radi!')
});






app.post("/succesfull", (req, res) => {
    // on endpoint call
    // res.end("Payment success!");
    console.log(JSON.parse(response.body))
});
