let crypto =  require('crypto');

function validateHmac(key, payload, inputHash){
    let hash = crypto.createHmac('sha256', key).update(payload);

    hashOut = `sha256=${hash.digest('hex')}`;

    return inputHash === hashOut;
}

module.exports ={
    validateHmac
}