<?php
include('db.php');

function dodajSliku($umetnikId, $naslov, $opis, $putanja) {
    global $conn; // Vaša veza sa bazom podataka

    try {
        $stmt = $conn->prepare("INSERT INTO slike (umetnik_id, naslov, opis, putanja_do_slike, datum_postavljanja, broj_pregleda) VALUES (?, ?, ?, ?, NOW(), 0)");
        if (dodajSliku($umetnikId, $naslov, $opis, $putanja)) {
            echo "Slika je uspešno dodata.";
        } else {
            echo "Došlo je do greške prilikom dodavanja slike.";
        }        
        $stmt->bind_param("isss", $umetnikId, $naslov, $opis, $putanja);
        $stmt->execute();
        $stmt->close();
        return true;
    } catch (Exception $e) {
        // Greška pri izvršavanju SQL upita
        return false;
    }
}


// Funkcija koja vraća niz slika iz baze podataka
function getSlike() {
    global $conn;

    $slike = array();
    $result = $conn->query("SELECT * FROM slike");

    while ($row = $result->fetch_assoc()) {
        $slike[] = $row;
    }

    return $slike;
}


function dodajKomentar($korisnikId, $slikaId, $tekst) {
    global $conn; // Vaša veza sa bazom podataka

    try {
        $stmt = $conn->prepare("INSERT INTO komentari (korisnik_id, slika_id, tekst, datum_komentarisanja) VALUES (?, ?, ?, NOW())");
        $stmt->bind_param("iis", $korisnikId, $slikaId, $tekst);
        $stmt->execute();
        $stmt->close();
        return true;
    } catch (Exception $e) {
        // Greška pri izvršavanju SQL upita
        return false;
    }
}

function dodajOcenu($korisnikId, $slikaId, $ocena) {
    global $conn; // Vaša veza sa bazom podataka

    try {
        $stmt = $conn->prepare("INSERT INTO ocene (korisnik_id, slika_id, ocena) VALUES (?, ?, ?)");
        $stmt->bind_param("iif", $korisnikId, $slikaId, $ocena);
        $stmt->execute();
        $stmt->close();
        return true;
    } catch (Exception $e) {
        // Greška pri izvršavanju SQL upita
        return false;
    }
}
function dodajFavorita($korisnikId, $slikaId) {
    global $conn; // Vaša veza sa bazom podataka

    try {
        $stmt = $conn->prepare("INSERT INTO favoriti (korisnik_id, slika_id) VALUES (?, ?)");
        $stmt->bind_param("ii", $korisnikId, $slikaId);
        $stmt->execute();
        $stmt->close();
        return true;
    } catch (Exception $e) {
        // Greška pri izvršavanju SQL upita
        return false;
    }
}

function dohvatiOceneKomentare($umetnikId) {
    global $conn; // Vaša veza sa bazom podataka

    try {
        $stmt = $conn->prepare("SELECT ocena, tekst FROM ocene JOIN komentari ON ocene.slika_id = komentari.slika_id WHERE ocene.korisnik_id = ?");
        $stmt->bind_param("i", $umetnikId);
        $stmt->execute();
        $result = $stmt->get_result();

        $oceneKomentari = array();
        while ($row = $result->fetch_assoc()) {
            $oceneKomentari[] = $row;
        }

        $stmt->close();
        return $oceneKomentari;
    } catch (Exception $e) {
        // Greška pri izvršavanju SQL upita
        return null;
    }
}
function dohvatiStatistiku($umetnikId) {
    global $conn; // Vaša veza sa bazom podataka

    try {
        $stmt = $conn->prepare("SELECT COUNT(*) AS pregledi, AVG(ocena) AS prosecnaOcena FROM slike LEFT JOIN ocene ON slike.id = ocene.slika_id WHERE slike.umetnik_id = ?");
        $stmt->bind_param("i", $umetnikId);
        $stmt->execute();
        $result = $stmt->get_result();

        $statistika = $result->fetch_assoc();

        $stmt->close();
        return $statistika;
    } catch (Exception $e) {
        // Greška pri izvršavanju SQL upita
        return null;
    }
}

function prikaziOceneKomentare() {
    global $conn;
    
    $umetnikId = isset($_SESSION['umetnikId']) ? $_SESSION['umetnikId'] : null; // Postavite na odgovarajući umetnikId
    
    // SQL upit za dohvatanje ocena i komentara
    $sql = "SELECT ocena, tekst FROM ocene o
            JOIN komentari k ON o.slika_id = k.slika_id
            WHERE o.korisnik_id = $umetnikId";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Konvertuj rezultate u asocijativni niz
        $oceneKomentari = [];
        while ($row = $result->fetch_assoc()) {
            $oceneKomentari[] = $row;
        }
        echo json_encode($oceneKomentari);
    } else {
        echo "Nema dostupnih ocena i komentara.";
    }
}

// Funkcija za prikaz statistike
function prikaziStatistiku() {
    global $conn;

    $umetnikId = isset($_SESSION['umetnikId']) ? $_SESSION['umetnikId'] : null; // Postavite na odgovarajući umetnikId
    
    // SQL upit za dohvatanje statistike
    $sql = "SELECT COUNT(*) AS pregledi, AVG(ocena) AS prosecnaOcena FROM slike
            LEFT JOIN ocene ON slike.id = ocene.slika_id
            WHERE slike.umetnik_id = $umetnikId";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $statistika = $result->fetch_assoc();
        echo json_encode($statistika);
    } else {
        echo "Nema dostupne statistike.";
    }
}

// Provera da li je AJAX zahtev
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['akcija'])) {
    // Proverite vrednost 'akcija' i pozovite odgovarajuću funkciju
    if ($_POST['akcija'] === 'prikaziOceneKomentare') {
        prikaziOceneKomentare();
    } elseif ($_POST['akcija'] === 'prikaziStatistiku') {
        prikaziStatistiku();
    }
    // Dodajte ostale akcije po potrebi
}


?>