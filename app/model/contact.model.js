const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const contactSchema = new Schema({
    country_code: {type: Number, required: true},
    contact_number: {type: Number, required: true},
    contact_person: {type: String, required: true},
    contact_email: {type: String, unique: true, required: true},
    createdBy: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    modifiedBy: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'modifiedDate' } });

exports.contactModel = mongoose.model('contact', contactSchema);