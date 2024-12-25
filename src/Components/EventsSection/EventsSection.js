import './EventsSection.css';
import { dateComparator, sortByDate } from '../../Utils/dateComparator';
import { EventCard } from '../EventCard/EventCard';
import { apiRequest } from '../../Utils/apiRequest';

export const EventsSection = ({ title, eventTiming }) => {
  const eventSection = document.createElement('section');
  eventSection.classList.add('events', eventTiming);
  const eventsTitle = document.createElement('h2');
  const eventDiv = document.createElement('div');
  eventsTitle.textContent = title;
  eventSection.append(eventsTitle);

  eventDiv.innerHTML = ` 
  <dotlottie-player class="loader" src="/public/main_scene.json" speed="1" loop autoplay></dotlottie-player>`;
  eventSection.append(eventDiv);

  return eventSection;
};

export const listOfEvents = async (parentNode, eventTiming) => {
  const res = await apiRequest({ method: 'get', endpoint: 'events' });
  const listOfEvents = await res.json();

  if (!Array.isArray(listOfEvents)) {
    console.error('Error: La respuesta no contiene un array válido de eventos.', listOfEvents);
    parentNode.innerHTML = '<p>Error al cargar eventos.</p>';
    return;
  }

  parentNode.innerHTML = '';
  sortByDate(listOfEvents);

  for (let event of listOfEvents) {
    event = dateComparator(event);

    if (event[eventTiming]) {
      const eventCard = EventCard(event);
      parentNode.classList.add('events-container');
      parentNode.append(eventCard);
    }
  }
};