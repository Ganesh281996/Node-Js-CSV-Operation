const awsStepFunction = require('aws-sdk/clients/stepfunctions');
const splitterService = require('./appService');
const config = require('../config/index').config;

const stepFunction = new awsStepFunction();

exports.splitter = async function(bucketDetails) {
    const s3Object = await splitterService.getS3Object(bucketDetails);
    console.log("S3 Object = ",s3Object);

    const csvChunks = splitterService.splitCsv(s3Object);
    csvChunks.forEach(singleCsv => {
        console.log('SINGLE CSV OBJECT = ',singleCsv);
    });

    const keys = splitterService.getKeys(csvChunks.length);
    keys.forEach(key => {
        console.log('KEY = ',key);
    });

    const uploadCsvResult = await splitterService.uploadCsv(csvChunks , keys);
    uploadCsvResult.forEach(result => {
        console.log('UPLOAD CSV RESULT = ',result);
    });
    
    return {
        "count" : csvChunks.length,
        "keys" : keys
    };
};
exports.invokeStepFunction = function(data) {
    return new Promise(function(resolve , reject) {
        stepFunction.startExecution({
            stateMachineArn : config.StateMachineARN,
            input : JSON.stringify(data)
        },function(error , result) {
            if (error) reject(error);
            resolve(result);
        });
    }).catch(error => {
        console.log('ERROR = ',error);
    });
};