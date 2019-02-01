let logger = require('pino')();

let exceptionHandler = function Errorhandler(error,extra) {
    Error.captureStackTrace(this,this.constructor);
    this.name=this.constructor.name;
    this.error=error;
    this.extra=extra;
    logger.error('ERROR = ',error);
};

module.exports = exceptionHandler;