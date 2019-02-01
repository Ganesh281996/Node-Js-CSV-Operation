let csvParser = require('csvjson');
let S3 = require('aws-sdk/clients/s3');
let config = require('./files/config.json');
let errorHandler=require('./ExceptionHandler');
let logger = require('pino')();

const s3 = new S3();

exports.getS3Object = function(bucketDetails) {
    return new Promise(function(resolve , reject) {
        s3.getObject(bucketDetails , function(error , data) {
            if(error) throw error;
            resolve(data.Body.toString());
        });
    });
};

exports.csvToJson = function(csvData) {
    return csvParser.toObject(csvData);
};

exports.jsonToSmallerChunks = function(array) {
    let resultArray =[];
    while(array.length) {
        resultArray.push(array.splice(0,config.ChunkSize))
    }
    return resultArray;
};

exports.jsonToCsv = function(array) {
    let csvArray =[];
    array.forEach(data => {
        console.log('Single Json = ',data);
        csvArray.push(csvParser.toCSV(data , {headers : 'relative'}));
    });
    return csvArray;
};

exports.uploadCsvs = function(csvArray) {
    csvArray.forEach(csvData => {
        console.log('Singel csv data = ',csvData);
        s3.putObject({
            Bucket : config.IntermediateBucket.Bucket,
            Key : Math.random().toString(10)+config.IntermediateBucket.Key,
            Body : csvData 
        }, function(error , data) {
            if(error) throw error;
            console.log("DATA =",data);
        });
    });
};