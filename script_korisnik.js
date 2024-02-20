// Funkcija za dohvatanje informacija o korisniku i ažuriranje HTML-a
function prikaziImePrezimeKorisnika() {
  // Dohvatanje informacija o korisniku putem AJAX-a
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var korisnikInfo = JSON.parse(xhr.responseText);

          // Provera da li su informacije dostupne
          if (korisnikInfo && korisnikInfo.ime && korisnikInfo.prezime) {
              // Ažuriranje HTML-a sa imenom i prezimenom korisnika
              var imePrezimeKorisnikaElement = document.getElementById('imePrezimeKorisnika');
              if (imePrezimeKorisnikaElement) {
                  imePrezimeKorisnikaElement.textContent = korisnikInfo.ime + ' ' + korisnikInfo.prezime;
              }
          }
      }
  };

  xhr.open('GET', 'korisnik_info.php', true);
  xhr.send();
}

// Poziv funkcije kada se stranica učita
window.onload = prikaziImePrezimeKorisnika;

function prikaziSlikeUmetnika() {
    $.ajax({
        type: 'POST',
        url: 'galerija.php',
        data: { akcija: 'prikaziSlikeUmetnika' },
        success: function(response) {
            $('#slikeUmetnika').html(response);
        },
        error: function() {
            alert('Došlo je do greške prilikom dohvatanja slika umetnika.');
        }
    });
}

$(document).ready(function() {
    prikaziSlikeUmetnika();
});

  
  function pretraziSlike() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
  
    // Filtriraj slike na osnovu unetog pojma
    const rezultatiPretrage = galerijaSlika.filter(slika =>
      slika.naziv.toLowerCase().includes(searchTerm)
    );
  
    // Prikazi rezultate pretrage
    prikaziRezultatePretrage(rezultatiPretrage);
  }
  
  function prikaziRezultatePretrage(rezultati) {
    const galerijaSlika = document.getElementById('galerija');
    galerijaSlika.innerHTML = '';
  
    if (rezultati.length === 0) {
      galerijaSlikaSlika.innerHTML = '<p>Nema rezultata za uneti pojam.</p>';
    } else {
      rezultati.forEach(slika => {
        const slikaElement = document.createElement('div');
        slikaElement.classList.add('slika');
  
        const imgElement = document.createElement('img');
        imgElement.src = slika.src;
        imgElement.alt = slika.naziv;
        slikaElement.appendChild(imgElement);
  
        galerijaSlika.appendChild(slikaElement);
      });
    }
  }
  

//dolazenje do odredjenog dela stranice(galerija slika)
document.querySelector('a[href="#galerija"]').addEventListener('click', function(event) {
    event.preventDefault(); // Da sprečimo uobičajenu akciju linka
    // Ovde možete dodati dodatnu logiku, na primer, skrolovanje do određenog dela stranice
    // Na primer, možete koristiti smooth scroll:
    document.getElementById('galerija').scrollIntoView({ behavior: 'smooth' });
  });

  //dolazenje do odredjenog dela stranice(omiljene slike)
  document.querySelector('a[href="#omiljenjeSlike"]').addEventListener('click', function(event) {
    event.preventDefault(); // Da sprečimo uobičajenu akciju linka
    // Ovde možete dodati dodatnu logiku, na primer, skrolovanje do određenog dela stranice
    // Na primer, možete koristiti smooth scroll:
    document.getElementById('omiljenjeSlike').scrollIntoView({ behavior: 'smooth' });
  });

  //funkcije za odjavu
  document.querySelector('a[href="#odjava"]').addEventListener('click', function(event) {
    event.preventDefault(); // Da sprečimo uobičajenu akciju linka
    // Ovde možete dodati dodatnu logiku, na primer, skrolovanje do određenog dela stranice
    // Na primer, možete koristiti smooth scroll:
    document.getElementById('odjava').scrollIntoView({ behavior: 'smooth' });
  });

  // Dodajte funkciju za stvarnu odjavu korisnika
  function odjaviKorisnika() {
    // Ovde možete dodati logiku za odjavljivanje
    // Na primer, prijava na server za potvrdu identiteta i zatim preusmeravanje na početnu stranicu
    alert('Uspešno odjavljeno!');
    window.location.href = 'prijava.html';
  }
  