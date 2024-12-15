<?php
function getDatabaseConnection() {
    $host = "localhost"; 
    $username = "root";
    $password = ""; 
    $database = "dolphin_crm"; 

    $conn = new mysqli($host, $username, $password, $database);

    $conn->connect_error && throw new Exception("Connection failed: " . $conn->connect_error);

    return $conn;
}
?>
