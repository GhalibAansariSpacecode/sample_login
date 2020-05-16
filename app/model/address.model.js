const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const addressSchema = new Schema({
    address1: {type: String, required: true},
    // address1: {type: String, required: true, type: Schema.Types.ObjectId, ref: 'User' },
    address2: {type: String, required: true},
    // address2: { required: true, default: 0, type: Schema.Types.ObjectId, ref: 'address' },
    city: {type: String, required: true},
    country: {type: String, required: true},
    pin_zip: {type: String, required: true},
    createdBy: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    modifiedBy: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'modifiedDate' } });

exports.addressModel = mongoose.model('address', addressSchema);