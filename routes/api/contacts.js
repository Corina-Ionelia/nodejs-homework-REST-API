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

router.delete('/:contactId', async(req, res, next) => {
    res.json({ message: 'template message' })
})

router.put('/:contactId', async(req, res, next) => {
    res.json({ message: 'template message' })
})

module.exports = router