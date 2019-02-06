const appService = require('./appService');

const splitterService = async function(bucketDetails) {

    const s3Object = await appService.getS3Object(bucketDetails);
    console.log("S3 Object =",s3Object);

    const csvChunks = appService.splitCsv(s3Object);
    csvChunks.forEach(singleCsv => {
        console.log('SINGLE CSV = ',singleCsv);
    });

    const keys = appService.getKeys(csvChunks.length);
    keys.forEach(key => {
        console.log('KEY = ',key);
    });

    const uploadCsvResult = await appService.uploadCsv(csvChunks , keys);
    uploadCsvResult.forEach(result => {
        console.log('UPLOAD CSV RESULT = ',result);
    });
};

module.exports = splitterService;