// src/utils/auth.js
export const setToken = (token) => {
  localStorage.setItem('token', token);
  window.dispatchEvent(new Event('tokenChanged'));
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('tokenChanged'));
};