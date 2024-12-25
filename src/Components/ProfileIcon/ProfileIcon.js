import './ProfileIcon.css';

export const profileIcon = imgSrc => {
  return `
    <div class="profile-icon" title="Log out">
    <span class="logout-icon"><img src="./public/logout.png" /></span>
    <img src="${imgSrc ||
    './public/usuario.png'
    }" /></div>
    `;
};