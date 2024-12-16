<?php
session_start();
require 'db_connection.php';

// Check user role
if ($_SESSION['role'] !== 'Admin') {
    echo json_encode(["success" => false, "error" => "Unauthorized"]);
    exit;
}

// Fetch data from the users table (adjust column names as needed)
$query = "SELECT fname AS first_name, lname AS last_name, email, role, created_at FROM users";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(["success" => true, "data" => $users]);
} else {
    echo json_encode(["success" => false, "error" => "No users found."]);
}
?>
