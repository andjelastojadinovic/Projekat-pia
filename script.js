function prijaviSe(tip) {
    var username, password;

    if (tip === 'korisnik') {
        username = document.getElementById('korisnikUsername').value;
        password = document.getElementById('korisnikPassword').value;
    } else if (tip === 'umetnik') {
        username = document.getElementById('umetnikUsername').value;
        password = document.getElementById('umetnikPassword').value;
    } 

    // Slanje AJAX zahteva za prijavu
    var xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (tip === 'korisnik') {
                window.location.href = 'pocetna_korisnik.html';
              } else if (tip === 'umetnik') {
                window.location.href = 'pocetna_umetnik.html';
              } 
        }
    }; 

    xhr.open('POST', 'login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&role=' + encodeURIComponent(tip));
    
}


document.addEventListener("DOMContentLoaded", function () {
  // Event listener for user registration form
  document.getElementById("formaRegistracijeKorisnika").addEventListener("submit", function (e) {
      e.preventDefault();
      registrujSe('korisnik');
  });

  // Event listener for artist registration form
  document.getElementById("formaRegistracijeUmetnika").addEventListener("submit", function (e) {
      e.preventDefault();
      registrujSe('umetnik');
  });

  // Event listener for login form
  document.getElementById("formaPrijave").addEventListener("submit", function (e) {
      e.preventDefault();
      prijaviSe();
  });
});

function registrujSe(tip) {
  var ime = document.getElementById("ime").value;
  var prezime = document.getElementById("prezime").value;
  var korisnickoIme = document.getElementById(tip === 'korisnik' ? "noviKorisnikUsername" : "noviUmetnikUsername").value;
  var lozinka = document.getElementById(tip === 'korisnik' ? "noviKorisnikPassword" : "noviUmetnikPassword").value;
  var email = document.getElementById(tip === 'korisnik' ? "email" : "emailUmetnik").value;

  var xhr = new XMLHttpRequest();
  var params = 'ime=' + encodeURIComponent(ime) +
               '&prezime=' + encodeURIComponent(prezime) +
               '&korisnicko_ime=' + encodeURIComponent(korisnickoIme) +
               '&lozinka=' + encodeURIComponent(lozinka) +
               '&email=' + encodeURIComponent(email);

  xhr.open('POST', tip === 'korisnik' ? 'register.php' : 'registerumetnik.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          // Redirect based on user type after successful registration
          window.location.href = tip === 'korisnik' ? 'pocetna_korisnik.html' : 'pocetna_umetnik.html';
      }
  };
  xhr.send(params);
}



  /// Event listener za otvaranje modalnog prozora kada se klikne na tekst "Registruj se"
const linkRegistrujSe = document.getElementById('linkRegistrujSe');
linkRegistrujSe.addEventListener('click', function (event) {
  event.preventDefault(); // Ovo će sprečiti da se izvrši uobičajena akcija klika na link

  otvoriModal('modalRegistracija');
});

const linkRegistrujSeUmetnik = document.getElementById('linkRegistrujSeUmetnik');
linkRegistrujSeUmetnik.addEventListener('click', function (event) {
  event.preventDefault(); // Ovo će sprečiti da se izvrši uobičajena akcija klika na link

  otvoriModal('modalRegistracijaUmetnik');
});

  // Funkcija za otvaranje modalnog prozora
  function otvoriModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}
  
  // Funkcija za zatvaranje modalnog prozora
  function zatvoriModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
  }
  
  // Event listener za otvaranje modalnog prozora kada se klikne na dugme "Registruj se"
const dugmeRegistracije = document.getElementById('dugmeRegistracije');
dugmeRegistracije.addEventListener('click', function() {
  otvoriModal('modalRegistracija');
});

const dugmeRegistracijeUmetnika = document.getElementById('dugmeRegistracijeUmetnika');
dugmeRegistracijeUmetnika.addEventListener('click', function() {
  otvoriModal('modalRegistracijaUmetnik');
});

  
  // Event listener za zatvaranje moda korisnika koristeći dugme za zatvaranje unutar moda za korisnike
const closeButtonKorisnik = document.getElementsByClassName('close')[0];
if (closeButtonKorisnik) {
  closeButtonKorisnik.addEventListener('click', function () {
    zatvoriModal('modalRegistracijaKorisnik');
  });
}
// Event listener za zatvaranje moda umetnika koristeći dugme za zatvaranje unutar moda za umetnike
const closeButtonUmetnik = document.getElementsByClassName('close')[0];
if (closeButtonUmetnik) {
  closeButtonUmetnik.addEventListener('click', function () {
    zatvoriModal('modalRegistracijaUmetnik');
  });
}

 