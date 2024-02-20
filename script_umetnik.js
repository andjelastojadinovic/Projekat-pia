// Funkcija za dohvatanje informacija o umetniku i ažuriranje HTML-a
function prikaziImePrezimeUmetnika() {
    // Dohvatanje informacija o umetniku putem AJAX-a
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var umetnikInfo = JSON.parse(xhr.responseText);

            // Provera da li su informacije dostupne
            if (umetnikInfo && umetnikInfo.ime && umetnikInfo.prezime) {
                // Ažuriranje HTML-a sa imenom i prezimenom umetnika
                var imePrezimeUmetnikaElement = document.getElementById('imePrezimeUmetnika');
                if (imePrezimeUmetnikaElement) {
                    imePrezimeUmetnikaElement.textContent = umetnikInfo.ime + ' ' + umetnikInfo.prezime;
                }
            }
        }
    };

    xhr.open('GET', 'umetnik_info.php', true);
    xhr.send();
}

// Poziv funkcije kada se stranica učita
window.onload = prikaziImePrezimeUmetnika;

// Funkcija za otvaranje moda
function otvoriModal(idModala) {
    var modal = document.getElementById(idModala);
    modal.style.display = "block";
}

// Funkcija za zatvaranje moda
function zatvoriModal(idModala) {
    var modal = document.getElementById(idModala);
    modal.style.display = "none";
}

// Funkcija za dodavanje slike
function dodajSliku() {
    // Preuzimanje vrednosti sa forme
    var opisSlike = document.getElementById('opisSlike').value;
    var slikaUpload = document.getElementById('slikaUpload').files[0];

    // Validacija ili dodatne provere ako su potrebne

    // Slanje AJAX zahteva za dodavanje slike
    var formData = new FormData();
    formData.append('opis', opisSlike);
    formData.append('slikaUpload', slikaUpload);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                zatvoriModal('modalDodajSliku');
    
                // Ažuriranje prikaza slika u galeriji
                var galerijaDiv = document.getElementById('galerija'); // Pretpostavljamo da postoji element sa id 'galerija'
                var novaSlikaElement = document.createElement('img');
                novaSlikaElement.src = xhr.responseText; // Pretpostavljamo da server vraća putanju do dodate slike
                galerijaDiv.appendChild(novaSlikaElement);
                galerijaDiv.innerHTML += '<img src="' + xhr.responseText + '" alt="Nova slika">';

            } else {
                // Obrada greške
                console.error(xhr.statusText);
            }
        }
    };

    xhr.open('POST', 'galerija.php', true);
    xhr.send(formData);
}

// Dodavanje event listener-a za otvaranje moda
document.getElementById('dodajSliku').addEventListener('click', function () {
    otvoriModal('modalDodajSliku');
});

function prikaziOceneKomentare() {
    $.ajax({
        type: 'POST',
        url: 'galerija.php',
        data: { akcija: 'prikaziOceneKomentare' },
        success: function(response) {
            $('#oceneKomentari').html(response);
        },
        error: function() {
            alert('Došlo je do greške prilikom dohvatanja ocena i komentara.');
        }
    });
}

function prikaziStatistiku() {
    $.ajax({
        type: 'POST',
        url: 'galerija.php',
        data: { akcija: 'prikaziStatistiku' },
        success: function(response) {
            $('#statistika').html(response);
        },
        error: function() {
            alert('Došlo je do greške prilikom dohvatanja statistike.');
        }
    });
}

$(document).ready(function() {
    prikaziOceneKomentare();
    prikaziStatistiku();
});


// Dodajte event listenere za pozivanje funkcija kada se kliknu određeni elementi
document.getElementById('oceneKomentari').addEventListener('click', prikaziOceneKomentare);
document.getElementById('statistika').addEventListener('click', prikaziStatistiku);
function odjaviUmetnika() {
    // Ovde možete dodati logiku za odjavljivanje
    // Na primer, prijava na server za potvrdu identiteta i zatim preusmeravanje na početnu stranicu
    alert('Uspešno odjavljeno!');
    window.location.href = 'prijava.html';
  }