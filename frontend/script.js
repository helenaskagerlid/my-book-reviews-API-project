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

            // Print the updated reviews
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

                let editButton = addEditButtonListener(review.document_id);
                editButton.innerText = 'Redigera recension';

                reviewWrapper.appendChild(h3);
                reviewWrapper.appendChild(article);
                reviewWrapper.appendChild(deleteButton);
                reviewWrapper.appendChild(editButton);

                reviewList.appendChild(reviewWrapper);

                // Lägg till lyssnare för att uppdatera TinyMCE när du klickar på "Redigera recension"
                editButton.addEventListener('click', () => {
                    editReview(review.document_id);
                    tinymce.get('reviewContent').setContent(review.content);
                });
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

function editReview(documentId) {
    currentReviewId = documentId;

    fetch(`http://localhost:3000/documents/edit/${documentId}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            tinymce.get('reviewContent').setContent(data.content);

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Uppdatera recension';
            updateButton.id = 'updateButton';

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

    const titleElement = document.getElementById('title');
    const contentElement = tinymce.get('reviewContent');

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

            // Clear both title and review content fields
            titleElement.value = '';
            contentElement.setContent('');

            // Print the updated reviews
            printReviews();
        })
        .catch(error => {
            console.error('Error updating review:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // När sidan laddas, lägg till hidden-klassen på section-wrapper
    document.getElementById('sectionWrapper').classList.add('hidden');
  });
  
  let loginButton = document.getElementById('loginButton');
  let sectionLoginPage = document.getElementById('sectionLoginPage');
  let sectionWrapper = document.getElementById('sectionWrapper');
  
  loginButton.addEventListener('click', async () => {
      const userName = document.getElementById('userName').value;
      const userPassword = document.getElementById('userPassword').value;
    
      try {
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userName, userPassword })
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log(data.message); // Login successful
          
          // Gör något när inloggningen är framgångsrik, t.ex. navigera till en annan sida
          // Här tar vi bort hidden-klassen från section-wrapper
          sectionLoginPage.classList.add('hidden');
          sectionWrapper.classList.remove('hidden');
        } else {
          console.error(data.message); // Invalid username and/or password
          // Visa ett felmeddelande för användaren
        }
      } catch (error) {
        console.error('Network error:', error);
        // Hantera nätverksfel här
      }
  });
  


/*
if (localStorage.getItem('user')) {
    printLogOutButton();
}   else {
        printLogInButton();
    }

loginButton.addEventListener('click', () => {
    if (localStorage.getItem('user')) {
        localStorage.removeItem('user')
        printLogInButton();
    } else {
        localStorage.setItem('user', JSON.stringify('helena89'));
        printLogOutButton();
    }
    
})

function printLogOutButton () {
    loginButton.innerText = 'Logga ut';
}

function printLogInButton () {
    loginButton.innerText = 'Logga in';
}*/