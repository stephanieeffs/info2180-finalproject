<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
include 'db_connection.php';
header("Content-Type: application/json");

$action = $_GET['action'] ?? 'fetch_all';
$response = [];

try {
    if ($action === 'fetch_contacts') {
        $query = "SELECT id, firstname, lastname, email, company, type FROM contacts";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        $response = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    } else {
        $response = ["error" => "Invalid action specified."];
    }
} catch (Exception $e) {
    http_response_code(500);
    $response = ["error" => $e->getMessage()];
}

echo json_encode($response);
$conn->close();
?>
