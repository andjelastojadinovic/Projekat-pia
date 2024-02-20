<?php
session_start();
header('Content-Type: application/json');
include('db.php'); // Pretpostavka da 'db.php' sadrži konekciju na bazu

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['username'], $_POST['password'], $_POST['role'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];
    $table = '';
    $redirectUrl = '';

    switch ($role) {
        case 'korisnik':
            $table = 'korisnici';
            $redirectUrl = 'pocetna_korisnik.html';
            break;
        case 'umetnik':
            $table = 'umetnici';
            $redirectUrl = 'pocetna_umetnik.html';
            break;
        case 'administrator':
            $table = 'administratori';
            $redirectUrl = 'admin_panel.html';
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Nepoznata uloga.']);
            exit;
    }

    $stmt = $conn->prepare("SELECT * FROM $table WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $role;
            echo json_encode(['success' => true, 'redirectUrl' => $redirectUrl]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Pogrešna lozinka.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => "Nalog ne postoji u kategoriji: $role."]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Nedostaju podaci za prijavu.']);
}
?>
