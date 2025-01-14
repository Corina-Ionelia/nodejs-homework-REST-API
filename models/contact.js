const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;