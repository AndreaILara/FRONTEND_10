import './EventAssistanceButton.css';
import { showToast } from '../Toast/Toast';
import { apiRequest } from '../../Utils/apiRequest';

export const EventAssistanceButton = (buttonContainer, eventObject) => {
  if (!eventObject || !Array.isArray(eventObject.attendees)) {
    console.error('El objeto del evento o los asistentes no son válidos.');
    return;
  }

  const existingButton = buttonContainer.querySelector('button.negative, button.assistance-btn');
  if (existingButton) existingButton.remove();

  if (localStorage.getItem('token')) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user._id) {
      console.error('El usuario no está autenticado o falta el _id.');
      return;
    }

    const eventId = eventObject._id;
    const joinEventButton = document.createElement('button');
    joinEventButton.classList.add('assistance-btn');

    const assistants = eventObject.attendees.map(assistant => assistant?._id || assistant); // Aseguramos IDs planos
    const userIsGoing = assistants.includes(user._id);

    joinEventButton.textContent = userIsGoing ? 'Darme de baja' : 'Unirme';
    joinEventButton.classList.toggle('negative', userIsGoing);

    joinEventButton.addEventListener('click', e => {
      handleEventAssistance({ e, eventId, userId: user._id, userIsGoing });
    });

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
    body: {
      action: userIsGoing ? 'remove' : 'add', // Acciones: 'add' para unirse o 'remove' para darse de baja
      userId,
    },
  };

  try {
    const res = await apiRequest(requestObject);
    const response = await res.json();

    if (res.ok) {
      const { updatedEvent } = response;

      // Actualiza el botón con el nuevo estado del evento
      EventAssistanceButton(e.target.parentNode, updatedEvent);

      e.target.classList.remove('loading');
      showToast(
        userIsGoing ? 'Te has dado de baja del evento.' : 'Te has unido al evento.',
        'green'
      );
    } else {
      showToast(response.message || 'Error al procesar la solicitud.', 'red');
    }
  } catch (error) {
    showToast('Error al enviar la solicitud.', 'red');
    console.error(error);
  }
};
