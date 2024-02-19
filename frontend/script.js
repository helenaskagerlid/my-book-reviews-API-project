document.addEventListener('DOMContentLoaded', function () {
    const reviewButton = document.getElementById('reviewButton');

    reviewButton.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('click');

        let reviewTitle = document.getElementById('title');
        let reviewContent = document.getElementById('reviewContent');

        let saveReview = {
            title: reviewTitle.value,
            content: reviewContent.value
        }

        fetch('http://localhost:3000/documents/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saveReview),
        })
            .then(res => res.json())
            .then(data => {
                console.log('Spara recension', data);
                reviewTitle.value = '';
                reviewContent.value = '';
                printReviews();
            })
            .catch(error => {
                console.error('Fel vid sparande av recension:', error);
            });
    });
});

