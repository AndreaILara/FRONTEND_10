import { UserProfile } from '../../Components/UserProfile/UserProfile';

export const ProfilePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  const userProfile = UserProfile();
  main.append(userProfile);
};
