<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ime = mysqli_real_escape_string($conn, $_POST['ime']);
    $prezime = mysqli_real_escape_string($conn, $_POST['prezime']);
    $korisnickoIme = mysqli_real_escape_string($conn, $_POST['korisnicko_ime']);
    $lozinka = mysqli_real_escape_string($conn, $_POST['lozinka']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);

    // Form validation logic here

    $hashed_lozinka = password_hash($lozinka, PASSWORD_DEFAULT);
    $query = "INSERT INTO korisnici (ime, prezime, korisnicko_ime, lozinka, email) VALUES ('$ime', '$prezime', '$korisnickoIme', '$hashed_lozinka', '$email')";
    
    if (mysqli_query($conn, $query)) {
        header("Location: pocetna_korisnik.html");
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($conn);
    }
}
?>

