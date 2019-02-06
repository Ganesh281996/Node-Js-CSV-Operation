const app = require('./src/app');

exports.handler = async (event) => {
    console.log('EVENT = ',event);

    const bucketDetails = {
        Bucket : event.Records[0].s3.bucket.name,
        Key : event.Records[0].s3.object.key
    };
    console.log('BUCKET DETAILS = ',bucketDetails);
    
    await app(bucketDetails);
};