import './DeleteEventButton.css';
import { showToast } from '../Toast/Toast';
import { Modal } from '../Modal/Modal';
import { apiRequest } from '../../Utils/apiRequest';

export const DeleteEventButton = (buttonContainer, eventObject) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const eventId = eventObject?._id;

  if (!eventId) {
    console.error('El evento no tiene un ID válido:', eventObject);
    return;
  }

  if (!eventObject?.organizer) {
    console.warn('El evento no tiene organizador asignado:', eventObject);
    return;
  }


  if (user.role === 'admin' || user._id === eventObject.organizer._id) {
    const deleteEventButton = document.createElement('button');
    const deleteImg = document.createElement('img');
    deleteImg.src = '/borrar.png';
    deleteEventButton.classList.add('del-btn', 'round');
    deleteEventButton.append(deleteImg);

    deleteEventButton.addEventListener('click', () => {
      const warning = warningBanner(eventId);
      document.body.append(warning);
    });

    if (buttonContainer) {
      buttonContainer.append(deleteEventButton);
    } else {
      console.error('Error: No se encontró el contenedor para los botones.');
    }
  } else {
    console.warn('El usuario no tiene permiso para eliminar este evento.');
  }
};


const deleteEvent = async (eventId) => {
  try {
    const res = await apiRequest({
      endpoint: `events/${eventId}`,
      method: 'DELETE',
    });

    if (res.status === 200) {
      const response = await res.json();
      showToast(response.message, 'red');
      document.querySelector(`article[data-id="${eventId}"]`)?.remove();
      document.querySelector('.modal')?.remove();


      document.body.innerHTML += `
        <div id="loading-screen">
          <p>Cargando...</p>
        </div>
      `;

      const loadingScreenStyle = document.createElement('style');
      loadingScreenStyle.textContent = `
        #loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          font-size: 20px;
          color: #333;
        }
      `;
      document.head.appendChild(loadingScreenStyle);


      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      const errorResponse = await res.json();
      showToast(errorResponse.message || 'Error al eliminar el evento.', 'red');
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    showToast('Error al conectar con el servidor.', 'red');
  }
};


const warningBanner = (eventId) => {
  const deleteWarningContainer = Modal();
  deleteWarningContainer.id = 'del-event';
  const warningBanner = document.createElement('div');
  warningBanner.innerHTML = `
    <p>¿Estás seguro de que quieres eliminar el evento?</p>
    <button class="del-btn" full-red>Sí. Eliminar el evento</button>
  `;

  const confirmationBtn = warningBanner.querySelector('button');
  confirmationBtn.addEventListener('click', () => {
    confirmationBtn.classList.add('loading');
    deleteEvent(eventId);
  });

  deleteWarningContainer.append(warningBanner);
  return deleteWarningContainer;
};