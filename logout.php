<?php
session_start(); // Start the session

// Destroy the session
session_unset(); // Unset all session variables
session_destroy(); // Destroy the session completely

// Return a JSON response
header('Content-Type: application/json');
echo json_encode(["success" => true]);
exit;
?>
