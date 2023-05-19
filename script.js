document.getElementById('email').addEventListener('input', function() {
    var email = this.value.trim();
    var emailExistsSpan = document.getElementById('emailExists');

    // Check if the email is empty or not valid
    if (email === '' || !validateEmail(email)) {
        emailExistsSpan.innerHTML = '';
        return;
    }

    // Check if the email exists in the database
    checkEmailExists(email, function(response) {
        if (response.exists) {
            emailExistsSpan.innerHTML = 'Email exists.';
        } else {
            emailExistsSpan.innerHTML = 'Email does not exist.';
        }
    });
});

document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var email = document.getElementById('email').value.trim();
    var emailExistsSpan = document.getElementById('emailExists');

    // Check if the email is empty or not valid
    if (email === '' || !validateEmail(email)) {
        emailExistsSpan.innerHTML = '';
        return;
    }

    // Check if the email exists in the database
    checkEmailExists(email, function(response) {
        if (response.exists) {
            emailExistsSpan.innerHTML = 'Email exists.';
        } else {
            emailExistsSpan.innerHTML = ''; // Clear error message
            insertEmail(email, function(response) {
                if (response.success) {
                    showModal('Email inserted successfully.');
                } else {
                    console.error('Failed to insert email:', response.error);
                }
            });
        }
    });
});

function checkEmailExists(email, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'check_email.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };
    xhr.send('email=' + encodeURIComponent(email));
}

function insertEmail(email, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'insert_email.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };
    xhr.send('email=' + encodeURIComponent(email));
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showModal(message) {
    var modal = document.getElementById('myModal');
    var modalMessage = document.getElementById('modalMessage');
    modalMessage.innerHTML = message;
    modal.style.display = 'block';

    var closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}
