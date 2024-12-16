<?php
session_start();
require 'db_connection.php';

if ($_SESSION['role'] !== 'Admin') {
    echo json_encode(["success" => false, "error" => "Unauthorized"]);
    exit;
}

$query = "SELECT firstname AS firstname, lastname AS lastname, email, role, created_at FROM users";
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
