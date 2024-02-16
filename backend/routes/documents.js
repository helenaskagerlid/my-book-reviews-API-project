const express = require('express');
const router = express.Router();
const connection = require('../lib/conn');

router.post('/create', (req, res) => {

    let title = req.body.title;
    let content = req.body.content;
    let ownerId = req.body.owner_id;

    connection.connect((err) => {
        if (err) console.log('err', err);

        let query = 'INSERT into documents (title, content, owner_id) VALUES (?, ?, ?)';
        let values = [title, content, ownerId];

        connection.query(query, values, (err, data) => {
            if (err) console.log('err', err);

            console.log('blogs', data);
            res.json({message: 'Your blog is saved'});
        })
    }) 

})


/* Ingen anslutning.connect här

router.post('/create', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;

    let query = 'INSERT into documents (title, content) VALUES (?, ?)';
    let values = [title, content];

    connection.query(query, values, (err, data) => {
        if (err) {
            console.log('err', err);
            return res.status(500).json({ error: 'Error creating document.' });
        }

        console.log('blogs', data);
        res.json({ message: 'Your blog is saved' });
    });
});

module.exports = router;

*/

  module.exports = router;