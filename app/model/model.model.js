const mongoose = require('mongoose');
const {Schema} = require('mongoose');

//user schema.
const modelSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    createdBy: { required: false, type: Schema.Types.ObjectId, ref: 'User' },
    modifiedBy: { required: false, type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'modifiedDate' } });

exports.modelModel = mongoose.model('model', modelSchema);