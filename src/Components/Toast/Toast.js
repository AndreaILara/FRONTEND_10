import Toastify from 'toastify-js';

export const showToast = (text, background) => {
  Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: 'bottom',
    position: 'right',
    stopOnFocus: true,
    style: {
      background,
      borderRadious: '10px',
      padding: '10px 20px',
    }
  }).showToast();
};