const app = require('./app/app');

exports.handler = async (event) => {
    console.log('EVENT = ',event);

    const bucketDetails = {
        Bucket : event.Records[0].s3.bucket.name,
        Key : event.Records[0].s3.object.key
    };
    console.log('BUCKET DETAILS = ',bucketDetails);
    
    const result = await app.splitter(bucketDetails).catch(error => {
        console.error('ERROR = ',error);
    });
    console.log('RESULT FROM SPLITTER = ',result);

    const data = await app.invokeStepFunction(result);
    console.log('STEP FUNCTION RESULT = ',data);
};