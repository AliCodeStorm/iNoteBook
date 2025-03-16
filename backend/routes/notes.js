const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        console.log("User ID from token:", req.user.id); // Debugging log

        const notes = await Notes.find({ user: req.user.id });

        console.log("Fetched Notes:", notes); //  Debugging log

        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).send('Internal Server Error');
    }
});


// Add a new note (POST request)
router.post('/addnotes', fetchuser, [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long')
], async (req, res) => {
    try {
        //  Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //  Extract request data
        const { title, description, tag } = req.body;

        //   spelling: Change `discripton` to `description` in schema OR keep `discripton`
        const note = new Notes({
            title,
            description,  //  Correct spelling
            tag,
            user: req.user.id
        });

        //  Save note to database
        const savedNote = await note.save();
        res.json(savedNote);  //  Return saved note

    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).send('Internal Server Error');
    }
});

//update the notes route
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNotes = {};
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//delete notes:
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //allow deletion 

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success":"notes has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
