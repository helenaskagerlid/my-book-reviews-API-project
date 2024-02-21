
const express = require('express');
const router = express.Router();
const connection = require('../lib/conn');

// create a new book review
router.post('/create', (req, res) => {

    let title = req.body.title;
    let content = req.body.content;

    connection.connect((err) => {
        if (err) console.log('err', err);

        let query = 'INSERT into documents (title, content) VALUES (?, ?)';
        let values = [title, content];

        connection.query(query, values, (err, data) => {
            if (err) console.log('err', err);

            console.log('blogs', data);
            res.json({message: 'Din recension är sparad'});
        })
    }) 

})

// get all the reviews
router.get('/', (req, res) => {
    connection.query('SELECT * FROM documents', (err, data) => {
        if (err) {
            console.log('Error fetching documents:', err);
            return res.status(500).json({ error: 'Error fetching documents.' });
        }

        res.json(data);
    });
});


module.exports = router;
