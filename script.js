// Menú Hamburguesa Responsive
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Ocultar menú al hacer clic en un enlace en móviles
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Modo Oscuro / Claro
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Comprobar preferencia guardada previamente
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.className = savedTheme;
    updateIcon(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            updateIcon('light');
        } else {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            updateIcon('dark');
        }
    });
}

function updateIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-moon';
    } else {
        themeIcon.className = 'fa-solid fa-sun';
    }
}

// Envío del formulario de contacto mediante AJAX
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            formStatus.style.display = 'block';
            if (data.success === "true" || data.success === true || (data.message && data.message.includes("successfully"))) {
                formStatus.style.color = '#10b981';
                formStatus.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
                contactForm.reset();
            } else if (data.message && data.message.includes("Activation")) {
                formStatus.style.color = '#f59e0b';
                formStatus.textContent = 'Por favor, revisa tu correo (cfbarrios.edu@outlook.com) y haz clic en el enlace "Activate Form" para activarlo.';
            } else {
                formStatus.style.color = '#ef4444';
                formStatus.textContent = 'Aviso: ' + (data.message || 'Error al enviar.');
            }
        })
        .catch(error => {
            formStatus.style.display = 'block';
            formStatus.style.color = '#ef4444';
            formStatus.textContent = 'Hubo un error al enviar el mensaje. Verifica tu conexión o activación de correo.';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensaje';
        });
    });
}
