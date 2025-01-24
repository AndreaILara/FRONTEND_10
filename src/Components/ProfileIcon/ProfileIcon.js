import './ProfileIcon.css';

export const profileIcon = (imgSrc) => {
  return `
    <div class="profile-icon" title="Mi Perfil">
      <span class="logout-icon">
        <img src="/logout.png" alt="Cerrar sesión" />
      </span>
      <img src="${imgSrc || '/usuario.png'}" alt="Foto de Perfil" />
    </div>
  `;
};
