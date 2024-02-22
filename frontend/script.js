tinymce.init({
    selector: "#reviewContent",
    plugins: "image",
    toolbar: "image | undo redo | forecolor backcolor | styleselect bold italic | alignleft alignright | checklist | code",

    setup: function (editor) {
        editor.on('change', function () {
            editor.save();
        });
    }
});

const reviewButton = document.getElementById("reviewButton");

reviewButton.addEventListener("click", function (event) {
    //event.preventDefault();
    console.log('click');

    let reviewTitle = document.getElementById('title');
    let reviewContent = document.getElementById('reviewContent');

    let saveReview = {
        title: reviewTitle.value,
        content: reviewContent.value
    };

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

let reviewList = document.getElementById('reviewList');

function printReviews() {
    fetch('http://localhost:3000/documents')
        .then(res => res.json())
        .then(data => {
            console.log('reviews', data);

            reviewList.innerHTML = '';

            data.map(review => {
                let reviewWrapper = document.createElement('div');
                reviewWrapper.classList.add('review-wrapper');

                let h3 = document.createElement('h3');
                h3.innerText = review.title;
                h3.classList.add('review-heading');

                let article = document.createElement('article');
                article.innerHTML = review.content; 

                let deleteButton = createDeleteButton(review.document_id);
                deleteButton.innerText = 'Radera';

                reviewWrapper.appendChild(h3);
                reviewWrapper.appendChild(article);
                reviewWrapper.appendChild(deleteButton);

                reviewList.appendChild(reviewWrapper);
            });
        })
        .catch(error => {
            console.error('Error printing reviews:', error);
        });
}

function createDeleteButton(documentId) {
    const button = document.createElement('button');
    button.addEventListener('click', () => deleteReview(documentId));
    return button;
}

function deleteReview(documentId) {
    fetch(`http://localhost:3000/documents/delete/${documentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            printReviews(); // Uppdatera gränssnittet efter borttagning
        })
        .catch(error => {
            console.error('Error deleting review:', error);
        });
}