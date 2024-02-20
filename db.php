<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "baza";

header("Access-Control-Allow-Origin: *");

// Kreiranje konekcije
$conn = new mysqli($servername, $username, $password, $dbname);

// Provera konekcije
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
