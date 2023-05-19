# api-js-php

# The intention of this project is to validate a form before the submission and page reloading is done. This way, the user saves time by not having to wait to see an error, wait for the page to reload, and only then having to type the information again.

Steps 1 of 6:
1. HTML->input and submit form.
2. JavaScript-> It detects if the input value is empty or any changes upon typing on the input value in real time, and use function validateEmail() to validate using emailRegex.test(email).
3. JavaScript-> The checkEmailExists() function will check if email exists in the database using Ajax response to send the information to check_email.php before the form submission.
4. check_email.php will run a query SELECT COUNT [] > 0 to identify if that same email on the input value is already on the database.
5. check_email.php will then return the answr by echoing json_encode($response) back to JavaScript.
6. JavaScript will then receive the $response and display underneath the place holder email exist or email does not exist.

Steps 7 of 10:

7. JavaScript  next step will be the same function checkEmailExists(), however handling the form submission. If email exist, then nothing happens after submitting the form, else if the email does not exist the function insertEmail() is called to insert a new email in the database using ajax request.
8. insert_email.php will run another email check to make sure the email is new and then will run the insert queries, if inserted returns true else return false.
9. Back to JavaScript, with a callback parameter inside the insertEmail() function, JavaScript gets the response if response.sucess then the showModal() function is called with an alert Email inserted successfully, else an alert failed to insert email pops up.
10. Last function showModal(), simple modal in JavaScript, HTML and CSS to display the message.
