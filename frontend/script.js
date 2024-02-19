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


let reviewList = document.getElementById('reviewList');

function printReviews() {
    fetch('http://localhost:3000/documents')
    .then(res => {
        if (!res.ok) {
            throw new Error(`Network response was not ok, status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('reviews', data);

        reviewList.innerHTML = '';

        data.map(review => {
            let h3 = document.createElement('h3')
            h3.innerText = review.title;
            let article = document.createElement('article')
            article.innerText = review.content;
            
            reviewList.appendChild(h3);
            reviewList.appendChild(article);
        });
    })
    .catch(error => {
        console.error('Error fetching reviews:', error);
    });

}