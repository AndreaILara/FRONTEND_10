import { apiRequest } from './apiRequest';

// Función para validar el token
export const validateToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // No hay token, se considera no autenticado
    return null;
  }

  try {
    const res = await apiRequest({
      endpoint: 'auth/validate-token', // Endpoint para validar el token
      method: 'GET',
    });

    if (res.status === 200) {
      const data = await res.json();
      return data.user; // Retorna los datos del usuario autenticado
    } else {
      // Si el token es inválido, elimínalo
      localStorage.removeItem('token');
      return null;
    }
  } catch (error) {
    console.error('Error al validar el token:', error);
    localStorage.removeItem('token');
    return null;
  }
};
