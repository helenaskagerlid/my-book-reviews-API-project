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

const saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function (event) {
    console.log('click');

    let reviewTitle = document.getElementById('title');
    let reviewContent = tinymce.get('reviewContent');

    let saveReview = {
        title: reviewTitle.value,
        content: reviewContent.getContent()
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
            
            // Empty the TinyMCE editor content
            reviewContent.setContent('');

            // Clear the title field
            reviewTitle.value = '';

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
                article.classList.add('review-article')

                let deleteButton = createDeleteButton(review.document_id);
                deleteButton.innerText = 'Radera';
                deleteButton.classList.add('delete-button');

                let editButton = addEditButtonListener(review.document_id);
                editButton.innerText = 'Redigera';
                editButton.classList.add('edit-button');

                reviewWrapper.appendChild(h3);
                reviewWrapper.appendChild(article);
                reviewWrapper.appendChild(deleteButton);
                reviewWrapper.appendChild(editButton);

                reviewList.appendChild(reviewWrapper);

                editButton.addEventListener('click', () => {
                    editReview(review.document_id);
                    tinymce.get('reviewContent').setContent(review.content);
                });
            });

            reviewList.classList.remove('hidden');
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
            printReviews(); 
        })
        .catch(error => {
            console.error('Error deleting review:', error);
        });
}

function addEditButtonListener(documentId) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Redigera recension';
    editButton.addEventListener('click', () => editReview(documentId));
    return editButton;
}

    const titleElement = document.getElementById('title');
    const contentElement = tinymce.get('reviewContent');

function editReview(documentId) {
    currentReviewId = documentId;

    document.getElementById('formWrapper').classList.remove('hidden');
    document.getElementById('reviewList').classList.add('hidden');

    fetch(`http://localhost:3000/documents/edit/${documentId}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            tinymce.get('reviewContent').setContent(data.content);

            const existingUpdateButton = document.getElementById('updateButton');
            if (existingUpdateButton) {
                existingUpdateButton.remove();
            }

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Uppdatera recension';
            updateButton.id = 'updateButton';
            updateButton.classList.add('update-button');

            updateButton.addEventListener('click', saveChanges);

            const formWrapper = document.querySelector('.form-wrapper');
            formWrapper.appendChild(updateButton);

            document.getElementById('saveButton').style.display = 'none';
            updateButton.style.display = 'block';

            editReview.updateButton = updateButton;

        })
        .catch(error => {
            console.error('Error fetching review for editing:', error);
        });
}

function saveChanges() {
    const reviewId = currentReviewId;
    console.log('Review ID to be updated:', reviewId);

    const updatedReview = {
        title: titleElement.value,
        content: contentElement.getContent()
    };

    fetch(`http://localhost:3000/documents/update/${reviewId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            
            // Empty the TinyMCE editor content
            contentElement.setContent('');

            // Reset currentReviewId after successful update
            currentReviewId = null;

            // Hide the update button
            document.getElementById('updateButton').style.display = 'none';

            //Displaty the save button
            document.getElementById('saveButton').style.display = 'block';

            // Clear both title and review content fields
            titleElement.value = '';
            contentElement.setContent('');

        })
        .catch(error => {
            console.error('Error updating review:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sectionWrapper').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

let loginButton = document.getElementById('loginButton');
let sectionLoginPage = document.getElementById('sectionLoginPage');
let sectionWrapper = document.getElementById('sectionWrapper');
let formWrapper = document.getElementById('formWrapper');
let reviewNav = document.getElementById('reviewNav');
let body = document.getElementById('body');
let authorHeading = document.getElementById('authorHeading');
let quoteHeading = document.getElementById('quoteHeading');

function printLogOutButton() {
    loginButton.innerText = 'Logga ut';
}

function printLogInButton() {
    loginButton.innerText = 'Logga in';
}

loginButton.addEventListener('click', () => {
    const isUserLoggedIn = localStorage.getItem('user');

    if (isUserLoggedIn) {
        localStorage.removeItem('user');
        printLogInButton();
        sectionWrapper.classList.add('hidden');
        formWrapper.classList.add('hidden');
        reviewNav.classList.add('hidden');
        sectionLoginPage.classList.add('section-login-page')
        sectionLoginPage.classList.remove('logged-in');
        body.classList.remove('logged-in-design'); 
        body.classList.add('first-page-design'); 
        quoteHeading.classList.remove('hidden');  
        authorHeading.classList.remove('hidden');
    } else {
        localStorage.setItem('user', JSON.stringify('helena89'));
        printLogOutButton();
        sectionLoginPage.classList.remove('section-login-page')
        sectionLoginPage.classList.add('logged-in');
        sectionWrapper.classList.remove('hidden');
        formWrapper.classList.remove('hidden');
        reviewNav.classList.remove('hidden');
        body.classList.add('logged-in-design');  
        body.classList.remove('first-page-design');
        quoteHeading.classList.add('hidden');  
        authorHeading.classList.add('hidden');
    }
    titleElement.value = '';
    contentElement.setContent('');
});

// Vid sidans laddning
if (localStorage.getItem('user')) {
    printLogOutButton();
} else {
    printLogInButton();
}

  let showReviewsButton = document.getElementById('showReviewsButton');

  showReviewsButton.addEventListener('click', function () {
    const titleElement = document.getElementById('title');
    const contentElement = tinymce.get('reviewContent');

    printReviews();

    document.getElementById('formWrapper').classList.add('hidden');
    reviewList.classList.remove('hidden');

    titleElement.value = '';
    contentElement.setContent('');

  });

  
  let newReviewButton = document.getElementById('newReviewButton');
  newReviewButton.addEventListener('click', function () {
    const titleElement = document.getElementById('title');
    const contentElement = tinymce.get('reviewContent'); 
    reviewList.classList.add('hidden');
    document.getElementById('formWrapper').classList.remove('hidden');
  
    titleElement.value = '';
    contentElement.setContent('');
    document.getElementById('saveButton').style.display = 'block';
    document.getElementById('updateButton').style.display = 'none';

  });
  
  

