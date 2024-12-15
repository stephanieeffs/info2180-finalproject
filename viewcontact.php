<?php

session_start();
if(!isset($_SESSION['id'])){
    session_destroy();
    header('Location: login.php');
    exit;
}

$host = "localhost";
$username = "root";
$password = "";
$db_name = "dolphin_crm";

$conn = new PDO("mysql:host=$host; dbname=$db_name; charset=utf8mb4",$username, $password);

$id = filter_var($_GET['view'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

//GETTING THE CONTACT
$stmt = $conn->prepare("SELECT * FROM contacts where id=$id");
$stmt->execute();
$row = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

//GETTING THE USER THAT CREATED THE CONTACT
$stmt = $conn->prepare("SELECT * FROM users where id= " . $row['created_by']);
$stmt->execute();
$created_by= $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

//GETTING THE USER THAT CONTACT IS ASSIGNED TO
$stmt = $conn->prepare("SELECT * FROM users where id= " . $row['assigned_to']);
$stmt->execute();
$assigned_to= $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

//GETTING THE NOTES FOR THE CONTACT
$stmt = $conn->prepare("SELECT * FROM notes where contact_id= " . $row['id']);
$stmt->execute();
$notes= $stmt->fetchAll(PDO::FETCH_ASSOC);


function convertDateFormat($date){
    $date = explode("-", $date);
    $monthNum  = $date[1];
    $dateObj   = DateTime::createFromFormat('!m', $monthNum);
    $monthName = $dateObj->format('F');
    return $monthName . " " . $date[2] . " " . $date[0];
}

function convertTimeFormat(){

}

?>
