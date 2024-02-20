<?php
include('db.php');
session_start();
// Funkcija za dohvatanje informacija o umetniku
function dohvatiInformacijeOUmetniku($conn) {
    // Provera da li je umetnik prijavljen
    if (isset($_SESSION['id'])) {
        $umetnikId = $_SESSION['id'];

        // Escape-ovanje podataka kako bi se spriječili SQL injection napadi
        $umetnikId = mysqli_real_escape_string($conn, $umetnikId);

        // SQL upit za dohvatanje informacija o umetniku
        $query = "SELECT ime, prezime FROM umetnici WHERE id = $umetnikId";

        // Izvršavanje upita
        $result = $conn->query($query);

        // Provera da li je upit uspeo
        if ($result) {
            // Dohvatanje rezultata
            $umetnikInfo = $result->fetch_assoc();
            return $umetnikInfo;
        } else {
            echo "Greška u upitu: " . $conn->error;
            return null;
        }
    } else {
        // Ako umetnik nije prijavljen, možete vratiti odgovarajući rezultat ili poslati odgovarajući signal
        return null;
    }
}

// Pozivanje funkcije za dohvatanje informacija o umetniku
$umetnikInfo = dohvatiInformacijeOUmetniku($conn);

// Zatvaranje konekcije
$conn->close();

// Vraćanje informacija u JSON formatu
header('Content-Type: application/json');
echo json_encode($umetnikInfo);

?>