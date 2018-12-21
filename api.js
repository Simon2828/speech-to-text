const fs = require('fs');
let rawData = fs.readFileSync('./mockData.json');
let data = JSON.parse(rawData);


class Api {

    
    logData() {
        console.log('data here!!', data);

    }
    // get all the lOs, return titles
    // /learning-objectives/
    
    
    // get one lo
    // /learning-objectives/:lO
    
    
    // post (create) an lO
    // learning-objectives/:lO
    
    // todo - delete an lO - DELETE http verb
    //          update an lO - put
}


module.exports = Api;
