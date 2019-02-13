let env = process.env.NODE_ENV;

if(env === undefined) {
    env = 'development';
}
else {
    env = env.toString(env.toLowerCase());
    if(env === 'dev' || env === 'development') {
        env = 'development';
    }
    else if(env === 'prod' || env === 'production') {
        env = 'production';
    }
    else if(env === 'test' || env === 'testing') {
        env = 'testing';
    }
    else {
        env = 'development';
    };
};

exports.config = require('./'+env);