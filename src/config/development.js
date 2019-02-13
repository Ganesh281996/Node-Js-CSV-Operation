const config = {
    "ChunkSize" : 5,
    "IntermediateBucket" : {
        "Bucket" : "intake-1045-s3-intermediate-bucket",
        "Key" : {
            "prefix" : "DEVELOPMENT-",
            "suffix" : ".csv"
        }
    },
    "SplitterString" : "#customer block end",
    "StateMachineARN" : "arn:aws:states:us-east-1:534751316579:stateMachine:Intake-1045-Trigger-From-Lambda"
};

module.exports = config;