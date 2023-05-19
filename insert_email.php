<?php
// Include the database connection file
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];

    // Check if the email already exists
    $selectQuery = "SELECT COUNT(*) AS count FROM emails WHERE email = '$email'";
    $selectResult = $mysqli->query($selectQuery);
    $row = $selectResult->fetch_assoc();
    $exists = $row['count'] > 0;

    // If email doesn't exist, insert it into the database
    if (!$exists) {
        $insertQuery = "INSERT INTO emails (email) VALUES ('$email')";
        $insertResult = $mysqli->query($insertQuery);

        if ($insertResult) {
            $success = true;
            $error = '';
        } else {
            $success = false;
            $error = 'Failed to insert email: ' . $mysqli->error;
        }
    } else {
        $success = false;
        $error = 'Email already exists.';
    }

    $response = [
        'success' => $success,
        'error' => $error
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>