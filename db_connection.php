<?php

$host = "localhost";
$username = "root";
$password = "061502kp"; // Empty password for XAMPP by default
$database = "dolphin_crm";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
