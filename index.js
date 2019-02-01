let app = require('./src/app');
let logger = require('pino')();

exports.handler = async (event) => {
    logger.info('EVENT = ',event);

    const bucketDetails = {
        Bucket : event.Records[0].s3.bucket.name,
        Key : event.Records[0].s3.object.key
    };
    logger.info('BUCKET DETAILS = ',bucketDetails);
    
    await app(bucketDetails);
}