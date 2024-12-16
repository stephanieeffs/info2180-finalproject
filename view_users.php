<?php
session_start();
require 'db_connection.php';

// Ensure the user is logged in and has the "Admin" role
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
    echo json_encode(["success" => false, "error" => "Unauthorized"]);
    exit;
}

// Query to fetch user data (ensure column names match your database schema)
$query = "SELECT fname AS firstname, lname AS lastname, email, role, created_at FROM users";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    // Return the list of users as JSON
    echo json_encode(["success" => true, "data" => $users]);
} else {
    // Return an error message if no users are found
    echo json_encode(["success" => false, "error" => "No users found."]);
}

// Close the database connection
$conn->close();
?>
