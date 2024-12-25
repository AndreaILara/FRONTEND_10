import './EventAssistanceButton.css';
import { showToast } from '../Toast/Toast';
import { apiRequest } from '../../Utils/apiRequest';

export const EventAssistanceButton = (buttonContainer, eventObject) => {
  // Asegúrate de que el botón previo sea eliminado para evitar duplicados
  const existingButton = buttonContainer.querySelector('button');
  if (existingButton) existingButton.remove();

  if (localStorage.getItem('token')) {
    const user = JSON.parse(localStorage.getItem('user'));
    const eventId = eventObject._id;

    const joinEventButton = document.createElement('button');
    joinEventButton.classList.add('assistance-btn'); // Añade una clase para facilitar estilos

    // Verifica si el usuario ya está asistiendo
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

    buttonContainer.append(joinEventButton);
  }
};

const handleEventAssistance = async ({ e, eventId, userId, userIsGoing }) => {
  e.target.classList.add('loading'); // Indica que se está procesando la acción

  const requestObject = {
    endpoint: `events/${eventId}`,
    method: 'PUT',
    body: userIsGoing
      ? { attendees: [] } // Remover asistencia
      : { attendees: [userId] }, // Agregar asistencia
  };

  try {
    const res = await apiRequest(requestObject);
    const response = await res.json();

    if (res.status === 200) {
      const { updatedEvent } = response;

      // Actualiza el botón pero no elimina el resto de la tarjeta
      EventAssistanceButton(e.target.parentNode, updatedEvent);

      // Remueve la clase de carga
      e.target.classList.remove('loading');
    } else {
      showToast(response.message || 'Error al procesar la solicitud', 'red');
    }
  } catch (error) {
    showToast('Error al enviar la solicitud', 'red');
    console.error(error);
  }
};
