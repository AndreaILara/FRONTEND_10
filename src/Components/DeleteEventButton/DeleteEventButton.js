import './DeleteEventButton.css';
import { showToast } from '../Toast/Toast';
import { Modal } from '../Modal/Modal';
import { apiRequest } from '../../Utils/apiRequest';

export const DeleteEventButton = (buttonContainer, eventObject) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.role === 'admin') {
    const eventId = eventObject._id;
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


    if (buttonContainer) {
      buttonContainer.append(deleteEventButton);
    } else {
      console.error('Error: No se encontró el contenedor para los botones.');
    }
  }
};

/* Lógica para eliminar el evento */
const deleteEvent = async (e, eventId) => {
  const res = await apiRequest({
    endpoint: 'events',
    id: eventId,
    method: 'DELETE',
  });

  const response = await res.json();
  if (res.status === 200) {
    showToast(response.message, 'red');
    e.target.closest('article').remove();
    document.querySelector('.modal').remove();
  } else {
    showToast(response, 'red');
  }
};

const warningBanner = () => {
  const deleteWarningContainer = Modal();
  deleteWarningContainer.id = 'del-event';
  const warningBanner = document.createElement('div');
  warningBanner.innerHTML = `
  <p>¿Estás seguro de que quieres eliminar el evento?</p>
  <button class="del-btn" full-red>Sí. Eliminar el evento</button>
  `;
  deleteWarningContainer.append(warningBanner);
  return deleteWarningContainer;
};
