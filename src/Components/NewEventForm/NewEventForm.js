import { createEventForm } from '../../Data/Forms';
import { UserForm } from '../UserForm/UserForm';
import './NewEventForm.css';
import { showToast } from '../Toast/Toast';
import { listOfEvents } from '../EventsSection/EventsSection';
import { Modal } from '../Modal/Modal';
import { apiRequest } from '../../Utils/apiRequest';

const validateForm = () => {
  const name = document.querySelector('#name').value.trim();
  const date = document.querySelector('#date').value.trim();
  const location = document.querySelector('#location').value.trim();
  const gameName = document.querySelector('#game').value.trim();

  if (!name || !date || !location || !gameName) {
    showToast('Todos los campos son obligatorios', 'red');
    return false;
  }

  const inputDate = new Date(date);
  const now = new Date();
  if (now > inputDate) {
    showToast('La fecha del evento debe ser futura', 'red');
    return false;
  }

  return true;
};

const postEvent = async e => {
  e.preventDefault();

  if (!validateForm()) return;

  const gameName = document.querySelector('#game').value;
  const dataList = document.querySelector('#list-of-games');
  const gameOption = dataList.querySelector(`[value="${gameName}"]`);

  if (!gameOption) {
    showToast('Por favor, selecciona un juego válido de la lista', 'red');
    return;
  }

  // Obtener datos del usuario autenticado
  const user = JSON.parse(localStorage.getItem('user'));

  const body = {
    name: document.querySelector('#name').value.trim(),
    date: document.querySelector('#date').value.trim(),
    location: document.querySelector('#location').value.trim(),
    games: [gameOption.getAttribute('data-id')], // Usar el ID del juego
    organizer: user._id, // Agregar el organizador
  };

  try {
    const res = await apiRequest({
      endpoint: 'events',
      method: 'POST',
      body,
    });

    const response = await res.json();
    if (res.status === 201) {
      const { message } = response;
      showToast(message, 'linear-gradient(to right, #00b09b, #96c93d)');
      document.querySelector('#create-event').remove();

      const upcomingEventsDiv = document.querySelector(
        'section.isUpcoming > div'
      );
      await listOfEvents(upcomingEventsDiv, 'isUpcoming');
    } else {
      showToast(response.error || 'Error al crear el evento', 'red');
    }
  } catch (error) {
    showToast('Error al procesar la solicitud', 'red');
    console.error(error);
  }
};

export const NewEventForm = () => {
  const eventFormContainer = Modal();
  eventFormContainer.id = 'create-event';

  UserForm(eventFormContainer, 'Crea tu propio evento', createEventForm);

  // Validación de fecha en tiempo real
  eventFormContainer
    .querySelector('[type="date"]')
    .addEventListener('change', e => {
      const inputDate = new Date(e.target.value);
      const now = new Date();
      if (now > inputDate) {
        showToast('La fecha del evento debe ser futura', 'red');
      }
    });

  // Campo para seleccionar juegos
  const gameInputContainer = document.createElement('div');
  gameInputContainer.classList.add('input-container');
  gameInputContainer.innerHTML = `
    <label class="iLabel" for="game">Juego</label>
    <input class="input" list="list-of-games" id="game" name="game">
    <datalist id="list-of-games"></datalist>`;

  document.body.append(eventFormContainer);
  document
    .querySelector('#create-event button')
    .insertAdjacentElement('beforebegin', gameInputContainer);

  // Poblar lista de juegos desde el backend
  const datalistOfGames = document.querySelector('#list-of-games');
  apiRequest({ method: 'get', endpoint: 'boardgames' })
    .then(res => res.json())
    .then(listOfGames => {
      for (const game of listOfGames) {
        const option = document.createElement('option');
        option.value = game.title; // Nombre visible
        option.setAttribute('data-id', game._id); // ID para backend
        datalistOfGames.append(option);
      }
    })
    .catch(error => {
      showToast('Error al cargar la lista de juegos', 'red');
      console.error(error);
    });

  // Manejo del envío del formulario
  document
    .querySelector('#create-event form')
    .addEventListener('submit', postEvent);
};
