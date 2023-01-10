function getUpdates(akcija, user, pass, merchant) {
    
    let akcija = 'SESSIONTOKEN';
    let user = 'api.test@payten.com';
    let pass = 'Hephr=R4SKNycaLf';
    let merchant = 'chipcardtest01';
    
                request.post('https://entegrasyon.asseco-see.com.tr/msu/api/v2', 
                                {
                                        json: {
                                                ACTION: akcija,
                                                MERCHANTUSER: user,
                                                MERCHANTPASSWORD: pass,
                                                MERCHANT: merchant
                                        }
                                }, callback);
};

export default getUpdates;