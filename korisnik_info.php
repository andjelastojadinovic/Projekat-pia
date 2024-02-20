<?php
include('db.php');
function dohvatiInformacijeOKorisniku($conn) {
    // Provera da li je umetnik prijavljen
    if (isset($_SESSION['id'])) {
        $korisnikId = $_SESSION['id'];

        // Escape-ovanje podataka kako bi se spriječili SQL injection napadi
        $korisnikId = mysqli_real_escape_string($conn, $korisnikId);

        // SQL upit za dohvatanje informacija o umetniku
        $query = "SELECT ime, prezime FROM korisnici WHERE id = $korisnikId";

        // Izvršavanje upita
        $result = $conn->query($query);

        // Provera da li je upit uspeo
        if ($result) {
            // Dohvatanje rezultata
            $korisnikInfo = $result->fetch_assoc();
            return $korisnikInfo;
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
$korisnikInfo = dohvatiInformacijeOKorisniku($conn);

// Zatvaranje konekcije
$conn->close();

// Vraćanje informacija u JSON formatu
header('Content-Type: application/json');
echo json_encode($korisnikInfo);
?>