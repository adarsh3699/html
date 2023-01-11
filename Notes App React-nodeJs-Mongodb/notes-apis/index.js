const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { getMongoDb } = require('./utils');

const auth = require('./routes/auth');
const notes = require('./routes/notes');
const settings = require('./routes/settings');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', auth);
app.use('/notes', notes);
app.use('/settings', settings);

const PORT = process.env.PORT || 4000;

app.get('/', function (req, res) {
    res.send('Hello World');
});

mongoose
    .connect(getMongoDb(), { useNewUrlParser: true })
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        })
    )
    .catch((err) => {
        console.log(err);
    });

// //to make external files work
// app.use(express.static('public'));

// //body parser is required to access variables send through post request
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // setting up routes
// app.get('/', function(req, res) {
//   res.send("hello world");
// });

// app.use('/auth', userRoutes);
// app.use('/notes', require('./routes/notes'));

// //error handling
// app.use(function(err, req, res, next) {
//   res.status(422).send({ error: err.message });
// });

// //setup server
// app.listen(process.env.PORT || 4000, function() {
//   console.log("Server Running");
// });
