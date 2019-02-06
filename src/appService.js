const S3 = require('aws-sdk/clients/s3');
const config = require('./files/config.json');

const s3 = new S3();

exports.getS3Object = function(bucketDetails) {
    return new Promise(function(resolve , reject) {
        s3.getObject(bucketDetails , function(error , s3Object) {
            if(error) reject(error);
            resolve(s3Object.Body.toString());
        });
    });
};
exports.splitCsv = function(s3Object) {
    let csv = {
        result : [],
        array : [],
        stringArray : []
    };
    s3Object = s3Object.split('\n');
    s3Object.forEach(row => {
        csv.stringArray.push(row);
        if(row.startsWith(config.SplitterString)) {
            csv.array.push(csv.stringArray.join('\n'));
            csv.stringArray = [];
        };
        if(csv.array.length === config.ChunkSize) {
            csv.result.push(csv.array.join('\n'));
            csv.array = [];
        };
    });
    if(csv.array.length) {
        csv.result.push(csv.array.join('\n'));
    };
    return csv.result;
};
exports.getKeys = function(size) {
    let keys = [];
    for(let i=0 ; i<size ; i++) {
        keys.push(config.IntermediateBucket.Key.prefix+Math.random().toString(10)+config.IntermediateBucket.Key.suffix);
    };
    return keys;
};
function putObject(csvData , key) {
    return new Promise(function(resolve , reject) {
        s3.putObject({
            Bucket : config.IntermediateBucket.Bucket,
            Key : key,
            Body : csvData
        }, function(error , data) {
            if(error) reject(error);
            resolve(data);
        });
    });
};
exports.uploadCsv = function(csvArray , keys) {
    let putObjectPromises = [];
    for(let i=0 ; i<csvArray.length ; i++) {
       putObjectPromises.push(putObject(csvArray[i] , keys[i])) ;
    };
    return Promise.all(putObjectPromises);
};