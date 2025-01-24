import { Events } from '../../Pages/Events/Events';
import { Home } from '../../Pages/Home/Home';
import { Login } from '../../Pages/Login/Login';
import { Register } from '../../Pages/Register/Register';
import { ProfilePage } from '../../Pages/Profile/Profile';
import { AddGame } from '../../Pages/AddGame/AddGame';
import { profileIcon } from '../ProfileIcon/ProfileIcon';
import './HeaderNav.css';

const navLayout = () => `
<ul class="flex-container">
  <li>
    <a href="#" id="events-link">Eventos</a>
  </li>
  ${localStorage.getItem('token')
    ? `
    <li id="add-game-link" style="display: none;">
      <a href="#">Añadir Juegos</a>
    </li>
    <li>
      <a href="#" id="profile-link">Mi Perfil</a>
    </li>
    <li id="profile-icon">
      ${profileIcon(JSON.parse(localStorage.getItem('user')).profilePic)}
    </li>
    `
    : `
    <li id="log-link">Identificarse</li>
    `
  }
</ul>`;

export const Header = () => {
  const header = document.querySelector('header nav');
  header.innerHTML = navLayout();

  // Navegación al Home
  const homeLink = document.querySelector('#logo');
  homeLink.addEventListener('click', Home);

  // Navegación a Eventos
  const eventsLink = document.querySelector('#events-link');
  eventsLink.addEventListener('click', Events);

  if (localStorage.getItem('token')) {
    // Acceso a Mi Perfil
    const profileLink = document.querySelector('#profile-link');
    profileLink.addEventListener('click', ProfilePage);

    // Logout al hacer clic en la imagen de perfil
    const profileIconElement = document.querySelector('#profile-icon .logout-icon img');
    profileIconElement.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Header(); // Actualizar el header después de logout
      Home(); // Redirigir al home
    });

    // Mostrar enlace "Añadir Juegos" solo si es admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      const addGameLink = document.querySelector('#add-game-link');
      addGameLink.style.display = 'list-item'; // Mostrar el enlace para admins
      addGameLink.addEventListener('click', AddGame);
    }
  } else {
    // Menú de Login y Registro si no hay token
    const logLink = document.querySelector('#log-link');
    logLink.addEventListener('click', (e) => {
      e.stopPropagation();

      if (!document.querySelector('#menu-login')) {
        const menuContainer = document.createElement('div');
        menuContainer.id = 'menu-login';

        const loginLink = document.createElement('a');
        loginLink.id = 'login-link';
        loginLink.innerText = 'Login';
        loginLink.addEventListener('click', Login);

        const registerLink = document.createElement('a');
        registerLink.id = 'register-link';
        registerLink.innerText = 'Registrarse';
        registerLink.addEventListener('click', Register);

        menuContainer.append(loginLink, registerLink);
        logLink.appendChild(menuContainer);
      }

      logLink.classList.toggle('open');
    });

    // Cierra el menú si haces clic fuera
    document.addEventListener('click', () => {
      const loginMenu = document.querySelector('#menu-login');
      if (loginMenu) loginMenu.remove();
      const logLink = document.querySelector('#log-link');
      if (logLink) logLink.classList.remove('open');
    });
  }
};

// Función para limpiar el estado del header
export const cleanHeader = () => {
  const headerLinks = document.querySelectorAll('header > nav > ul > li');
  for (const link of headerLinks) {
    link.classList.remove('current-location');
  }
};
