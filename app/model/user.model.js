const mongoose = require('mongoose');
const {Schema} = require('mongoose');

//user schema.
const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address_id: { type: Schema.Types.ObjectId, ref: 'address' },
    salt: {type: String, required: true},
    is_active: {type: Boolean, default: 1},
    is_deleted: {type: Boolean, default: 0},
    role_id: { type: Schema.Types.ObjectId, ref: 'role' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'modifiedDate' }} );

exports.userModel = mongoose.model('User', userSchema);