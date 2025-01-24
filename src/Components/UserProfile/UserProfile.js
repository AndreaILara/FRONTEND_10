import './UserProfile.css';
import { apiRequest } from '../../Utils/apiRequest';
import { showToast } from '../Toast/Toast';

export const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Obtener datos del usuario autenticado

  // Crear contenedor del perfil
  const profileSection = document.createElement('section');
  profileSection.classList.add('profile-section');

  const title = document.createElement('h2');
  title.textContent = 'Mi Perfil';
  profileSection.append(title);

  // Mostrar datos del usuario
  const userInfo = document.createElement('div');
  userInfo.classList.add('user-info');
  userInfo.innerHTML = `
    <p><strong>Nombre:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
  `;
  profileSection.append(userInfo);

  // Botón para eliminar cuenta
  const deleteAccountButton = document.createElement('button');
  deleteAccountButton.textContent = 'Eliminar Cuenta';
  deleteAccountButton.classList.add('delete-account-btn');
  deleteAccountButton.addEventListener('click', async () => {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmDelete) {
      try {
        const res = await apiRequest({
          endpoint: `users/${user._id}`,
          method: 'DELETE',
        });

        const response = await res.json();
        if (res.status === 200) {
          showToast(response.message, 'red');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.href = '/'; // Redirigir al home después de eliminar la cuenta
        } else {
          showToast(response.message || 'Error al eliminar la cuenta.', 'red');
        }
      } catch (error) {
        console.error(error);
        showToast('Error al conectar con el servidor.', 'red');
      }
    }
  });
  profileSection.append(deleteAccountButton);

  // Devolver el contenedor completo
  return profileSection;
};
