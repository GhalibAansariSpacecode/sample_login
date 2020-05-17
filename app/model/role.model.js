const mongoose = require('mongoose');
const {Schema} = require('mongoose');
// const {roleTypeModel} = require('role_type.model')
// const {modelModel} = require('model.model')

//user schema.
const roleSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    role_type_id: { type: Schema.Types.ObjectId, ref: 'role_type' },
    model_ids: { type: Schema.Types.ObjectId, ref: 'model' },
    createdBy: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    modifiedBy: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'modifiedDate' } });

exports.roleModel = mongoose.model('role', roleSchema);