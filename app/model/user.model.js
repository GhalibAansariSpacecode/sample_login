const mongoose = require('mongoose');
const {Schema} = require('mongoose');

//user schema.
const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // address_id: { required: true, type: Schema.Types.ObjectId, ref: 'User', feild: 'name' },
    salt: {type: String, required: true},
    is_active: {type: Boolean, default: 1},
    is_deleted: {type: Boolean, default: 0},
    // role_id: { required: true, type: Schema.Types.ObjectId, ref: 'User', feild: 'name' },
    // createdBy: { required: true, type: Schema.Types.ObjectId, ref: 'User', feild: 'name' },
    // modifiedBy: { required: true, type: Schema.Types.ObjectId, ref: 'User', feild: 'name' },
    // createdDate: {},
    // modifiedDate: {}
});

exports.userModel = mongoose.model('User', userSchema);