(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 125) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 100, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


})(jQuery);


// Formulario de contacto
document.getElementById('imObjectForm_3').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner-email');
    const resultMessage = document.getElementById('resultMessage');
    const ONE_MINUTE = 60000; // 60 segundos en milisegundos
    const now = Date.now();

    // Obtener el último envío desde el almacenamiento local
    const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');

    // Validar el tiempo transcurrido
    if (lastSubmissionTime && (now - lastSubmissionTime < ONE_MINUTE)) {
        const timeRemaining = Math.ceil((ONE_MINUTE - (now - lastSubmissionTime)) / 1000);
        resultMessage.innerHTML = `<p class="text-danger">Debes esperar ${timeRemaining} segundos antes de enviar el próximo mensaje.</p>`;

        // Deshabilitar el botón de enviar
        submitBtn.disabled = true;

        // Rehabilitar el botón después de que el tiempo restante haya pasado
        setTimeout(() => {
            submitBtn.disabled = false;
            resultMessage.innerHTML = ''; // Limpiar mensaje de error
        }, timeRemaining * 1000);

        return;
    }

    // Validación del formulario
    const nombre = document.getElementById('imObjectForm_3_1').value.trim();
    const email = document.getElementById('imObjectForm_3_2').value.trim();
    const asunto = document.getElementById('imObjectForm_3_3').value.trim();
    const mensaje = document.getElementById('imObjectForm_3_4').value.trim();

    if (!nombre || !email || !asunto || !mensaje) {
        resultMessage.innerHTML = '<p class="text-danger">Por favor, completa todos los campos.</p>';
        return;
    }

    if (asunto.length < 7) {
        resultMessage.innerHTML = '<p class="text-danger">El asunto es muy corto. Debe tener al menos 7 caracteres.</p>';
        return;
    }

    if (mensaje.length < 10) {
        resultMessage.innerHTML = '<p class="text-danger">Tu mensaje es muy corto. Debe tener al menos 10 caracteres.</p>';
        return;
    }

    // Mostrar el spinner
    submitBtn.style.display = 'none';
    spinner.style.display = 'block';
    resultMessage.innerHTML = '';

    // Recoger datos del formulario
    const formData = new FormData(this);

    // Enviar datos del formulario mediante AJAX
    fetch('imemail/index.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Guardar la hora del envío en el almacenamiento local
        localStorage.setItem('lastSubmissionTime', now);

        // Ocultar el spinner y mostrar el botón de enviar nuevamente
        spinner.style.display = 'none';
        submitBtn.style.display = 'block';

        // Mostrar mensaje de resultado
        resultMessage.innerHTML = '<p class="text-success">Tu mensaje ha sido enviado.</p>';

        // Limpiar el formulario
        document.getElementById('imObjectForm_3').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        // Ocultar el spinner y mostrar el botón de enviar nuevamente
        spinner.style.display = 'none';
        submitBtn.style.display = 'block';

        // Mostrar mensaje de error
        resultMessage.innerHTML = '<p class="text-danger">Hubo un error al enviar tu mensaje. Inténtalo nuevamente.</p>';
    });
});


// Colapsar el menú de navegación al hacer click en un link
document.addEventListener("DOMContentLoaded", function() {
    var navbarCollapse = document.getElementById('navbarCollapse');
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function(event) {
            var isDropdownLink = this.classList.contains('dropdown-toggle') || this.parentElement.classList.contains('dropdown-menu');

            if (!isDropdownLink) {
                // Si el menú está desplegado, se colapsa
                if (navbarCollapse.classList.contains('show')) {
                    var bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: true
                    });
                }
            }
        });
    });
});


// Scroll suave al ancla "horarios-y-valores" (resolución >= 1212px)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#horarios-y-valores"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (window.innerWidth >= 1212) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop + 500,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});


// Scroll suave al ancla "horarios-y-valores" (resolución <= 600px)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#horarios-y-valores"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (window.innerWidth <= 600) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop + 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});


// Scroll suave al ancla "contacto" (resolución >= 1212px)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#contacto"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (window.innerWidth >= 1212) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop + 3300,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});


// Alerta flotante de Giras Pedagógicas
document.addEventListener('DOMContentLoaded', function() {
    let alertShown = false;
    const floatingAlert = document.getElementById('floatingAlertGiras');

    // Función para cerrar la alerta
    window.closeFloatingAlertGiras = function() {
        floatingAlert.classList.remove('show');
        // Ocultar el overlay
        const overlay = document.getElementById('floatingAlertOverlay');
        overlay.classList.remove('show');

        // Ocultar completamente después de la animación
        setTimeout(() => {
            floatingAlert.style.display = 'none';
            overlay.style.display = 'none'; // ← ocultar overlay también
        }, 500);
    };

    // Función para mostrar la alerta con scroll
    function handleScroll() {
        if (alertShown) return; // Solo verificar si ya se mostró

        // Obtener el div "About Start"
        const aboutSection = document.querySelector('.container-fluid.bg-light');

        if (aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            const aboutBottom = aboutRect.bottom;

            // Si el usuario ha pasado completamente el div "About"
            if (aboutBottom < 0) {
                // Mostrar overlay
                const overlay = document.getElementById('floatingAlertOverlay');
                overlay.style.display = 'block';

                floatingAlert.style.display = 'block';
                // Pequeño delay para que se vea la transición
                setTimeout(() => {
                    floatingAlert.classList.add('show');
                    overlay.classList.add('show');
                }, 100);

                alertShown = true;
            }
        }
    }

    // Agregar event listener para scroll con throttle para mejor rendimiento
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 100);
    });
});