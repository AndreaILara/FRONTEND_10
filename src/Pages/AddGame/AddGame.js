import './AddGame.css';
import { showToast } from '../../Components/Toast/Toast';

export const AddGame = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
    <section class="add-game-section">
      <h2>Añadir un Nuevo Juego</h2>
      <form id="add-game-form" enctype="multipart/form-data">
        <label for="title">Título:</label>
        <input type="text" id="title" name="title" required />
        
        <label for="releaseYear">Año de Lanzamiento:</label>
        <input type="number" id="releaseYear" name="releaseYear" />

        <label for="minPlayers">Número Mínimo de Jugadores:</label>
        <input type="number" id="minPlayers" name="minPlayers" />

        <label for="maxPlayers">Número Máximo de Jugadores:</label>
        <input type="number" id="maxPlayers" name="maxPlayers" max=10 />

        <label for="rating">Calificación:</label>
        <input type="number" id="rating" name="rating" step="0.1" min="0" max="10" />

        <label for="price">Precio:</label>
        <input type="number" id="price" name="price" step="0.01" />

        <label for="images">Imágenes:</label>
        <input type="file" id="images" name="img" multiple accept="image/*" />

        <button type="submit">Añadir Juego</button>
      </form>
    </section>
  `;

  const form = document.getElementById('add-game-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:3000/api/v2/boardgames', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        showToast('Juego añadido correctamente.', 'green');
        form.reset();
      } else {
        showToast(result.error || 'Error al añadir el juego.', 'red');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      showToast('Error al conectar con el servidor.', 'red');
    }
  });
};
