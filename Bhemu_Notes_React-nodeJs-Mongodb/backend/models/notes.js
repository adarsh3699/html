const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    userId: { type: String, require: true },
    notesTitle: { type: String, required: true },
    notesType: { type: Boolean, required: true },
    noteData: { type: String, required: true },
    updatedOn: { type: Date, required: true },
    id: { type: String },
});

module.exports = mongoose.model('Notes', NotesSchema);
