<?php
// Database configuration
$host = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'check_email';

// Create database connection
$mysqli = new mysqli($host, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($mysqli->connect_errno) {
    die('Database connection failed: ' . $mysqli->connect_error);
}
?>