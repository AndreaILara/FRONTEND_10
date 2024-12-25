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
      background
    }
  }).showToast();
};