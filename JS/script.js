// Lógica para mostrar/ocultar el menú lateral
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('menu-toggle');

// Manejar el clic en el botón de menú
toggleButton.addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que el botón altere la URL
  if (sidebar) {
    sidebar.classList.toggle('show'); // Alternar la visibilidad del sidebar
  }
});

// Cerrar el menú al mover el mouse fuera del sidebar
if (sidebar) {
  sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.remove('show'); // Cerrar el sidebar
  });
}

// Manejar clic en los enlaces del sidebar
const sidebarLinks = sidebar ? sidebar.querySelectorAll('.nav-link') : [];
sidebarLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el enlace cambie la URL
    hideForms(); // Ocultar formularios si se hace clic en un enlace

    // Navegar a las secciones correspondientes
    const targetId = this.getAttribute('href').substring(1); // Obtener el ID del destino
    const targetElement = document.getElementById(targetId); // Obtener el elemento destino

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' }); // Desplazarse hacia el elemento
    }
  });
});

// Función para ocultar formularios
function hideForms() {
  const forms = ['signup-form', 'login-form', 'turnos-form', 'servicios-form', 'comentarios-form'];
  forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
      form.classList.add('d-none'); // Ocultar formularios
    }
  });

  // Ocultar el dashboard
  const dashboard = document.getElementById('dashboard');
  if (dashboard) {
    dashboard.classList.add('d-none'); // Ocultar el dashboard
  }
}

// Manejar clic en íconos de navegación
document.addEventListener('click', function(event) {
  const navIcons = document.querySelectorAll('.icon-link'); // Selector para los enlaces de íconos
  const isNavIcon = Array.from(navIcons).some(icon => icon.contains(event.target));

  if (isNavIcon) {
    hideForms(); // Ocultar formularios si el clic fue en íconos
  }
});

// Función para mostrar un formulario
function showForm(formId) {
  hideForms(); // Ocultar todos los formularios

  const formToShow = document.getElementById(formId + '-form');
  if (formToShow) {
    formToShow.classList.remove('d-none'); // Mostrar el formulario correspondiente
  }
}

// Manejar clic en los botones de Login y Sign Up
const signupButton = document.getElementById('signup-btn'); // Botón de Sign Up
const loginButton = document.getElementById('login-btn'); // Botón de Login

if (signupButton) {
  signupButton.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón
    showForm('signup'); // Mostrar el formulario de Sign Up
  });
}

if (loginButton) {
  loginButton.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón
    showForm('login'); // Mostrar el formulario de Login
  });
}

function flipCard(cardName) {
  const card = document.querySelector(`.card-flip.${cardName}`);
  const front = card.querySelector('.card-front');
  const back = card.querySelector('.card-back');

  front.classList.toggle('d-none');
  back.classList.toggle('d-none');
}

// Configuración del gráfico de ventas
const ctx = document.getElementById('ventasChart').getContext('2d');
const ventasChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Ventas en $',
      data: [5000, 4000, 6000, 7000, 8000],
      backgroundColor: ['#007bff', '#17a2b8', '#28a745', '#ffc107', '#dc3545']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});