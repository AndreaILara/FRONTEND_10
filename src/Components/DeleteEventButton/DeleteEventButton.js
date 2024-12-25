import './DeleteEventButton.css';
import { showToast } from '../Toast/Toast';
import { Modal } from '../Modal/Modal';
import { apiRequest } from '../../Utils/apiRequest';

export const DeleteEventButton = (buttonContainer, eventObject) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user.role === 'admin') {
    const eventId = eventObject._id;

    // Crear contenedor de botones
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-container');

    // Crear botón de eliminar
    const deleteEventButton = document.createElement('button');
    const deleteImg = document.createElement('img');
    deleteImg.src = '/borrar.png';
    deleteEventButton.classList.add('del-btn', 'round');
    deleteEventButton.append(deleteImg);

    deleteEventButton.addEventListener('click', event => {
      const warning = warningBanner();
      document.body.append(warning);
      const confirmationBtn = warning.querySelector('button');
      confirmationBtn.addEventListener('click', () => {
        confirmationBtn.classList.add('loading');
        deleteEvent(event, eventId);
      });
    });

    // Agregar botones al contenedor
    buttonGroup.append(deleteEventButton);

    // Si hay otros botones, los puedes añadir aquí
    // Ejemplo: Agregar botón de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar'; // Cambia según el caso
    editButton.classList.add('edit-btn');
    buttonGroup.append(editButton);

    // Añadir el grupo de botones al contenedor original
    buttonContainer.append(buttonGroup);
  }
};
