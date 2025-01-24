import { Header } from './src/Components/HeaderNav/HeaderNav';
import { Home } from './src/Pages/Home/Home';
import './style.css';
import 'toastify-js/src/toastify.css';
import { apiRequest } from './src/Utils/apiRequest';

const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await apiRequest({ endpoint: 'auth/validate-token', method: 'GET' });
    if (res.status === 200) {
      const { user } = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
  } catch (error) {
    console.error('Error al validar el token:', error);
  }

  // Si el token no es válido, se elimina del localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return false;
};

const initializeApp = async () => {
  document.documentElement.classList.remove('loading');

  const isAuthenticated = await validateToken();

  Header(); // Renderiza el header (se actualizará según el estado)
  Home(isAuthenticated); // Pasa el estado de autenticación a la página principal
};

window.addEventListener('load', initializeApp);
