
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

//update a specific review
router.patch('/update/:document_id', (req, res) => {
    const reviewId = req.params.document_id;
    const updatedReview = req.body;

    connection.query('UPDATE documents SET ? WHERE document_id = ?', [updatedReview, reviewId], (err, data) => {
        if (err) {
            console.log('Error updating review:', err);
            return res.status(500).json({ error: 'Error updating review.' });
        }

        res.json({ message: 'Recensionen är uppdaterad.' });
    });
});

//delete a specific review
router.delete('/delete/:document_id', (req, res) => {
    const documentId = req.params.document_id;

    connection.query('DELETE FROM documents WHERE document_id = ?', [documentId], (err, data) => {
        if (err) {
            console.log('Error deleting document:', err);
            return res.status(500).json({ error: 'Error deleting document.' });
        }

        res.json({ message: 'Recensionen är raderad.' });
    });
});

//get a specific review
router.get('/edit/:document_id', (req, res) => {
    const reviewId = req.params.document_id;

    connection.query('SELECT * FROM documents WHERE document_id = ?', [reviewId], (err, data) => {
        if (err) {
            console.log('Error fetching review for editing:', err);
            return res.status(500).json({ error: 'Error fetching review for editing.' });
        }

        res.json(data[0]);
    });
});


module.exports = router;
