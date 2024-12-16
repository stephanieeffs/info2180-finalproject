<?php
session_start();
require 'db_connection.php';
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($id, $hashed_password, $role);
    $stmt->fetch();

    if ($hashed_password && password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
        $_SESSION['role'] = $role;
        echo json_encode(["success" => true]); // No role-specific display logic
    } else {
        echo json_encode(["success" => false, "error" => "Invalid credentials"]);
    }

    $stmt->close();
}
$conn->close();
?>
