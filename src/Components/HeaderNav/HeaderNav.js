import { Events } from '../../Pages/Events/Events';
import { Home } from '../../Pages/Home/Home';
import { Login } from '../../Pages/Login/Login';
import { Register } from '../../Pages/Register/Register';
import { profileIcon } from '../ProfileIcon/ProfileIcon';
import './HeaderNav.css';

const navLayout = () => `
<ul class="flex-container">
  <li>
    <a href="#" id="events-link">Eventos</a>
  </li>
  <li id="log-link">

      ${localStorage.getItem('token')
    ? profileIcon(JSON.parse(localStorage.getItem('user')).profilePic)
    : 'Identificarse'
  }

  </li>
</ul>`;

const loginMenuLayout = () => {
  const menuContainer = document.createElement('div');
  menuContainer.id = 'menu-login';
  const loginLink = document.createElement('a');
  loginLink.id = 'login-link';
  loginLink.innerText = 'Login';
  const registerLink = document.createElement('a');
  registerLink.id = 'register-link';
  registerLink.innerText = 'Registrate';
  loginLink.addEventListener('click', Login);
  registerLink.addEventListener('click', Register);
  menuContainer.append(loginLink, registerLink);
  return menuContainer;
};

export const Header = () => {
  const header = document.querySelector('header nav');
  header.innerHTML = navLayout();
  const homeLink = document.querySelector('#logo');
  homeLink.addEventListener('click', Home);
  const eventsLink = document.querySelector('#events-link');
  eventsLink.addEventListener('click', Events);
  const logLink = document.querySelector('#log-link');

  if (localStorage.getItem('token')) {
    document.querySelector('#menu-login');
    logLink.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Header();
      Home();
    });
  } else {
    logLink.append(loginMenuLayout());
  }

  // Agregar comportamiento para mostrar/ocultar el menú
  logLink.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic en el link cierre el menú
    logLink.classList.toggle('open'); // Alterna la clase "open"
  });

  // Cierra el menú si haces clic fuera
  document.addEventListener('click', () => {
    logLink.classList.remove('open');
  });
};

export const cleanHeader = () => {
  const headerLinks = document.querySelectorAll('header > nav > ul > li');
  for (const link of headerLinks) {
    link.classList.remove('current-location');
  }
};
