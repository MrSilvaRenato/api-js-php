<?php
// Include the database connection file
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];

    // Perform email existence check
    $query = "SELECT COUNT(*) AS count FROM emails WHERE email = '$email'";
    $result = $mysqli->query($query);
    $row = $result->fetch_assoc();
    $exists = $row['count'] > 0;

    $response = [
        'exists' => $exists
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>