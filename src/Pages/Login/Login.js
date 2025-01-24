import { Header } from '../../Components/HeaderNav/HeaderNav';
import { showToast } from '../../Components/Toast/Toast';
import { UserForm } from '../../Components/UserForm/UserForm';
import { loginForm } from '../../Data/Forms';
import { apiRequest } from '../../Utils/apiRequest';
import { Home } from '../Home/Home';
import './Login.css';
const loginLayout = () => {

  const main = document.querySelector('main');
  main.innerHTML = '';

  const loginSection = document.createElement('section');
  loginSection.id = 'login';

  UserForm(loginSection, 'Login', loginForm);
  main.append(loginSection);
};

const loginSubmit = async e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  loginRequest(username, password);
};

export const Login = () => {
  loginLayout();
  document.querySelector('#login form').addEventListener('submit', loginSubmit);
};

export const loginRequest = async (username, password) => {
  try {
    const res = await apiRequest({
      endpoint: 'users/login',
      method: 'POST',
      body: { username, password },
    });

    if (res.status === 200) {
      const response = await res.json();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      Header();
      Home();
    } else {
      showToast('Nombre de usuario o contraseña incorrecto', 'red');
    }
  } catch (error) {
    console.error('Error en loginRequest:', error);
    showToast('Error al intentar iniciar sesión.', 'red');
  }
};