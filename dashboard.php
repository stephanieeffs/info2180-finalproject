<?php
include 'db_connection.php';
header("Content-Type: application/json");

$action = $_GET['action'] ?? 'fetch_all';
$response = [];

try {
    if ($action === 'fetch_contacts') {
        $filter = $_GET['filter'] ?? 'all';
        $where = [];
        $params = [];

        if ($filter === 'sales_leads') {
            $where[] = "type = ?";
            $params[] = "Sales Lead";
        }
        if ($filter === 'support') {
            $where[] = "type = ?";
            $params[] = "Support";
        }
        if ($filter === 'assigned_to_me') {
            $where[] = "assigned_to = ?";
            $params[] = $_SESSION['user_id'] ?? 1;
        }

        $query = "SELECT id, title, firstname, lastname, email, company, type FROM contacts";
        if ($where) {
            $query .= " WHERE " . implode(" AND ", $where);
        }

        $stmt = $conn->prepare($query);
        if ($params) {
            $stmt->bind_param(str_repeat("s", count($params)), ...$params);
        }
        $stmt->execute();

        $response = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    } elseif ($action === 'fetch_user_details') {
        $userId = intval($_GET['user_id'] ?? 0);
        if ($userId) {
            $stmt = $conn->prepare("SELECT id, firstname, lastname, email, role FROM users WHERE id = ?");
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $response = $stmt->get_result()->fetch_assoc() ?: ["error" => "User not found."];
        } else {
            $response = ["error" => "Invalid user ID."];
        }
    } else {
        $response = ["error" => "Invalid action specified."];
    }

} catch (Exception $e) {
    http_response_code(500);
    $response = ["error" => "Error: " . $e->getMessage()];
}

echo json_encode($response);
$conn->close();
?>
