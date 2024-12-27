import './EventAssistanceButton.css';
import { showToast } from '../Toast/Toast';
import { apiRequest } from '../../Utils/apiRequest';

export const EventAssistanceButton = (buttonContainer, eventObject) => {
  const existingButton = buttonContainer.querySelector('button.negative, button.assistance-btn');
  if (existingButton) existingButton.remove();

  if (localStorage.getItem('token')) {
    const user = JSON.parse(localStorage.getItem('user'));
    const eventId = eventObject._id;

    const joinEventButton = document.createElement('button');
    joinEventButton.classList.add('assistance-btn');

    const assistants = Array.isArray(eventObject.attendees) ? eventObject.attendees : [];
    const userIsGoing = assistants.find(assistant => assistant._id === user._id);

    if (userIsGoing) {
      joinEventButton.textContent = 'Darme de baja';
      joinEventButton.classList.add('negative');
      joinEventButton.addEventListener('click', e => {
        handleEventAssistance({ e, eventId, userIsGoing });
      });
    } else {
      joinEventButton.textContent = 'Unirme';
      joinEventButton.addEventListener('click', e => {
        handleEventAssistance({ e, eventId, userId: user._id });
      });
    }

    if (buttonContainer) {
      buttonContainer.append(joinEventButton);
    } else {
      console.error('Error: No se encontró el contenedor para los botones.');
    }
  }
};

const handleEventAssistance = async ({ e, eventId, userId, userIsGoing }) => {
  e.target.classList.add('loading');

  const requestObject = {
    endpoint: `events/${eventId}`,
    method: 'PUT',
    body: userIsGoing
      ? { attendees: [] }
      : { attendees: [userId] },
  };

  try {
    const res = await apiRequest(requestObject);
    const response = await res.json();

    if (res.status === 200) {
      const { updatedEvent } = response;
      EventAssistanceButton(e.target.parentNode, updatedEvent);
      e.target.classList.remove('loading');
    } else {
      showToast(response.message || 'Error al procesar la solicitud', 'red');
    }
  } catch (error) {
    showToast('Error al enviar la solicitud', 'red');
    console.error(error);
  }
};
