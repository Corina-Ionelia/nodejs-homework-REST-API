const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/contact'); // Asumând că modelul Contact este în acest fișier

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // Middleware pentru a parsa JSON

app.post('/api/contacts', async(req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.patch('/api/contacts/:contactId/favorite', async(req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
        return res.status(400).json({ message: 'missing field favorite' });
    }

    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            contactId, { favorite }, { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = app;