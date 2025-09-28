// js/select-lang.js

let currentLanguage = 'en'; // Asumimos que empezamos en español

document.querySelector('.select-selected').addEventListener('click', function(e) {
  this.nextElementSibling.classList.toggle('select-hide');
});

document.querySelector('.select-items div').addEventListener('click', function(e) {
  let value = this.getAttribute('data-value');
  if (value !== currentLanguage) {
    if (value === 'en') {
      window.location.href = 'index-en.html';
    } else if (value === 'es') {
      window.location.href = 'index.html';
    }
  }
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('.custom-select')) {
    document.querySelector('.select-items').classList.add('select-hide');
  }
});

// Función para cambiar el contenido basado en el idioma actual
function updateLanguageSelector() {
  const selectSelected = document.querySelector('.select-selected');
  const selectItems = document.querySelector('.select-items div');

  if (currentLanguage === 'es') {
    selectSelected.innerHTML = '<img src="img/spain.png" alt="Bandera de España" class="flag-icon">Español';
    selectItems.innerHTML = '<img src="img/uk-flag.png" alt="Bandera del Reino Unido" class="flag-icon">English';
    selectItems.setAttribute('data-value', 'en');
  } else {
    selectSelected.innerHTML = '<img src="img/uk-flag.png" alt="Bandera del Reino Unido" class="flag-icon">English';
    selectItems.innerHTML = '<img src="img/spain.png" alt="Bandera de España" class="flag-icon">Español';
    selectItems.setAttribute('data-value', 'es');
  }
}

// Llamar a esta función al cargar la página
updateLanguageSelector();
