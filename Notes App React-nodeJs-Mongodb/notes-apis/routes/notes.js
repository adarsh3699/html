const express = require('express');
const { encryptText, decryptText, verifyAccessToken } = require('../utils');
const Notes = require('../models/notes');

//setting express
const router = express.Router();

const app = express();

//get all notes
app.get('/', async function (req, res) {
    try {
        const isAccessTokenValid = verifyAccessToken(req);

        if (isAccessTokenValid?.authorization === false) {
            return res.status(401).json({ statusCode: 401, msg: isAccessTokenValid?.message });
        }

        const userId = isAccessTokenValid?.payload?.userId;
        if (!userId) return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });

        const queryResp = await Notes.find({ userId }, { userId: 0, __v: 0 }).sort({ updatedOn: -1 });
        const data = queryResp.map((element) => ({
            ...element._doc,
            notesId: element._id,
            _id: undefined,
            noteData: JSON.parse(decryptText(element.noteData)),
            notesTitle: decryptText(element.notesTitle),
        }));

        res.status(200);
        res.send({ statusCode: 200, msg: 'success', data });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});

// get notes by notesId  // currently not in use
app.get('/:notesId', async function (req, res) {
    const _id = req.params.notesId;
    if (!_id) {
        res.status(400);
        res.send({ statusCode: 400, msg: 'userId is not provided' });
        return;
    }

    try {
        const queryResp = await notesTable.find({ _id });
        const data = { ...queryResp[0], notesTitle: decryptText(queryResp[0].notesTitle) };

        res.status(200);
        res.send({ statusCode: 200, msg: 'success', data });
    } catch (e) {
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});

//create note
app.post('/', async function (req, res) {
    const notesTitle = encryptText(req.body.notesTitle);
    const notesType = req.body.notesType;
    const updatedOn = new Date(Date.now());
    const noteData = JSON.stringify(req.body.noteData);

    const encryptNoteData = encryptText(noteData);

    if (!notesTitle || !noteData || typeof notesType !== 'boolean')
        return res.status(400).json({ statusCode: 400, msg: 'Please Provide notesTitle, notesType and noteData' });
    try {
        const isAccessTokenValid = verifyAccessToken(req);

        if (isAccessTokenValid?.authorization === false) {
            return res.status(401).json({ statusCode: 401, msg: isAccessTokenValid?.message });
        }

        const userId = isAccessTokenValid?.payload?.userId;
        if (!userId) return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });

        const queryResp = await Notes.create({
            userId: userId,
            notesTitle,
            notesType,
            noteData: encryptNoteData,
            updatedOn,
        });
        res.status(200);
        res.send({ statusCode: 200, msg: 'inserted', notesId: queryResp._id });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});

//update
app.put('/', async function (req, res) {
    const _id = req.query.notesId;
    const notesTitle = encryptText(req.body.notesTitle);
    const newNotesData = JSON.stringify(req.body.newNotesData);
    const updatedOn = new Date(Date.now());

    const encryptNoteData = encryptText(newNotesData);

    if (!_id || !req.body.newNotesData || !req.body.notesTitle)
        return res.status(400).json({ statusCode: 400, msg: 'Please provide notesId, newNotes and notesTitle' });

    try {
        const isAccessTokenValid = verifyAccessToken(req);

        if (isAccessTokenValid?.authorization === false) {
            res.status(401);
            res.send({ statusCode: 401, msg: isAccessTokenValid?.message });
            return;
        }

        const userId = isAccessTokenValid?.payload?.userId;
        if (!userId) return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });

        const queryResp = await Notes.updateOne(
            { _id, userId },
            { $set: { noteData: encryptNoteData, notesTitle, updatedOn } }
        );

        res.status(200);
        res.send({ statusCode: 200, msg: 'updated' });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});

//delete
app.delete('/', async function (req, res) {
    const _id = req.query.noteId;

    if (!_id) {
        res.status(400);
        res.send({ statusCode: 400, msg: 'notesId is not provided' });
        return;
    }

    try {
        const isAccessTokenValid = verifyAccessToken(req);

        if (isAccessTokenValid?.authorization === false) {
            res.status(401);
            res.send({ statusCode: 401, msg: isAccessTokenValid?.message });
            return;
        }

        const userId = isAccessTokenValid?.payload?.userId;
        if (!userId) return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });

        const queryResp = await Notes.deleteOne({ _id, userId });

        res.status(200);
        res.send({ statusCode: 200, msg: 'deleted' });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});

//CRUD

//exporting this file so that it can be used at other places
module.exports = app;
