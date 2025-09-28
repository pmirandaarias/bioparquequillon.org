// js/lang-toggle.js

document.getElementById('lang-toggle').addEventListener('click', function() {
  // Obtén la URL actual
  var currentUrl = window.location.href;

  // Verifica si estamos en la versión en inglés
  if (currentUrl.includes('index-en.html')) {
    // Redirige a la versión en español
    window.location.href = currentUrl.replace('index-en.html', 'index.html');
  } else {
    // Redirige a la versión en inglés
    window.location.href = currentUrl.replace('index.html', 'index-en.html');
  }
});
