import { cleanHeader } from '../../Components/HeaderNav/HeaderNav';
import { Hero, heroData } from '../../Components/Hero/Hero';
import {
  EventsSection,
  listOfEvents,
} from '../../Components/EventsSection/EventsSection';

import './Home.css';

export const Home = async () => {
  cleanHeader();

  const main = document.querySelector('main');
  Hero(main, heroData);

  const eventSection = EventsSection({
    title: 'Eventos próximos',
    eventTiming: 'isUpcoming',
  });
  main.append(eventSection);
  await listOfEvents(eventSection.querySelector('div'), 'isUpcoming');
};