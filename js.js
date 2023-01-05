async function postData() {
  let user = {
    ACTION: 'SESSIONTOKEN',
    MERCHANTUSER: 'api.test@payten.com',
    MERCHANTPASSWORD: 'Hephr=R4SKNycaLf',
    MERCHANT: 'chipcardtest01',
    CUSTOMER: 'Customer-UCUoumJV',
    SESSIONTYPE: 'PAYMENTSESSION',
    MERCHANTPAYMENTID: 'Zicmi123',
    AMOUNT: 10.00,
    CURRENCY: 'TRY',
    CUSTOMEREMAIL: 'email@email.com',
    CUSTOMERNAM: 'Ime',
    CUSTOMERPHONE: '123456789',
    RETURNURL: '{##### vas return url ######}',
    SESSIONTYPE: '60',
  };

  try {
    const response = await axios.post("https://entegrasyon.asseco-see.com.tr/msu/api/v2", user);
    console.log("Request successful!");
    console.log(response);
  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status);
    } else {
      console.log(error.message);
    }
  }
}

postData();