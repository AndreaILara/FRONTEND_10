import { DeleteEventButton } from '../DeleteEventButton/DeleteEventButton';
import { EventAssistanceButton } from '../EventAssistanceButton/EventAssistanceButton';
import './EventCard.css';

export const EventCard = eventObject => {
  const eventContainer = document.createElement('article');
  eventContainer.classList.add('flex-container');

  const gameImage = eventObject.games?.[0]?.images?.[0] || '/ruta.jpg';
  console.log('Image URL:', gameImage);

  eventContainer.innerHTML = `
  <div class="img-container">
    <img src="${gameImage}" alt="${eventObject.name}"/>
  </div>
  <div class="event-info flex-container">
    <div>
      <h4>${eventObject.name}</h4>
      <p>${eventObject.games?.[0]?.title || 'Juego a confirmar'}</p>
      <p>${eventObject.date?.split('T')[0] || 'Fecha a confirmar'}</p>
      <p>${eventObject?.location || 'Ubicación a confirmar'}</p>
    </div>
    <div class="button-container"></div>
  </div>
  `;

  const buttonContainer = eventContainer.querySelector('.button-container');

  if (localStorage.getItem('user')) {
    // Pasa el objeto del evento completo
    DeleteEventButton(buttonContainer, eventObject);
  }
  if (eventObject.isUpcoming) {
    EventAssistanceButton(buttonContainer, eventObject);
  }
  return eventContainer;
};
