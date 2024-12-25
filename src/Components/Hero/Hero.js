import { Register } from '../../Pages/Register/Register';
import { NewEventForm } from '../NewEventForm/NewEventForm';
import './Hero.css';

export const heroData = {
  text: 'Descubre un mundo de juegos de mesa, estrategia y diversión. Únete a nuestros eventos, comparte risas y vive momentos únicos con amigos y familia. ¡La aventura comienza aquí!',
  image: '/friends.jpg'
};

const heroSection = ({ text, image }) => {
  return `
    <section id="hero" style="background-image:url(${image})">
    <div>
      <p>${text}    
      </p>
      <button>${localStorage.getItem('token') ? 'Crea tu propio evento' : 'Unirme'
    }</button>
    </div>
    </section>
    `;
};

export const Hero = (parentNode, { text, image }) => {
  parentNode.innerHTML = heroSection({ text, image });
  const heroButton = document.querySelector('#hero button');
  if (localStorage.getItem('token')) {
    heroButton.addEventListener('click', NewEventForm);
  } else {
    heroButton.addEventListener('click', Register);
  }
};