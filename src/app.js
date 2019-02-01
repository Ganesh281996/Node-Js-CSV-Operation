let errorHandler = require('./ExceptionHandler');
let appService = require('./appService');
let logger = require('pino')();

let splitterService = async function(bucketDetails) {
    logger.info('INSIDE SPLITTER SERVICE = ',bucketDetails);

    const s3Object = await appService.getS3Object(bucketDetails);
    console.log("s3object =",s3Object);

    const csvDataInJson = appService.csvToJson(s3Object);
    console.log("csvDataInJson =",csvDataInJson);

    const jsonChunks =  appService.jsonToSmallerChunks(csvDataInJson);
    console.log('jsonChunks =',jsonChunks);

    const csvArray =  appService.jsonToCsv(jsonChunks);
    console.log('csvArray = ',csvArray);
    csvArray.forEach(data => {
        console.log('Single csv data = ',data);
    });

    //await appService.uploadCsvs(csvArray);
};

module.exports = splitterService;