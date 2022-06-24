const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    description: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;