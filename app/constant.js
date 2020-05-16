
exports.Constant = {
    secret_key : 'secret_key_jwt_token',
    jwt_key : 'secrets',
    MongoDb: {
        MONGO_URI : 'mongodb://localhost',
        MONGO_PORT : 27017,
        db_name : 'sampleLogin',  
    },
    passwordRegex : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z-\d]{2,}$/,
    emailRegex: /^[a-zA-Z]{1,}([.])?[a-zA-Z0-9]{1,}([!@#$%&_-]{1})?[a-zA-Z0-9]{1,}[@]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,3}([.]{1}[a-zA-Z]{2})?$/
}