import { UserForm } from '../../Components/UserForm/UserForm';
import { registerForm } from '../../Data/Forms';
import { Login, loginRequest } from '../Login/Login';
import './Register.css';
import { showToast } from '../../Components/Toast/Toast';
import { apiRequest } from '../../Utils/apiRequest';

const registerLayout = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  const registerSection = document.createElement('section');
  registerSection.id = 'register';
  UserForm(registerSection, 'Register', registerForm);
  const isRegisteredQuery = document.createElement('p');
  isRegisteredQuery.innerHTML = `¿Ya estás registrado? <a href=#>Login</a>`;
  const title = registerSection.querySelector('h2');
  title.insertAdjacentElement('afterend', isRegisteredQuery);
  isRegisteredQuery.querySelector('a').addEventListener('click', Login);
  main.append(registerSection);
};

const registerSubmit = async e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  const response = await apiRequest({
    endpoint: 'users/register',
    method: 'POST',
    body: { username, email, password },
  });

  const data = await response.json();

  if (response.status !== 201) {
    showToast(data, 'red');
  } else {
    loginRequest(username, password);
  }
};

export const Register = () => {
  registerLayout();
  document
    .querySelector('#register form')
    .addEventListener('Submit', registerSubmit);
};