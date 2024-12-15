<?php
/*session_start();
require 'db_connection.php';

if ($_SESSION['role'] !== 'Admin') {
    echo json_encode(["success" => false, "error" => "Unauthorized"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z]).{8,}$/', $password)) {
        echo json_encode(["success" => false, "error" => "Password does not meet the requirements."]);
        exit;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $first_name, $last_name, $email, $password_hash, $role);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Database error."]);
    }
    $stmt->close();
}
?>
