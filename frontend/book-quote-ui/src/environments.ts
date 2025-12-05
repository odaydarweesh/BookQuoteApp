// src/environments.ts

const isProd = window.location.hostname !== 'localhost';

const baseUrlProd = 'https://bookquoteapp-8pxm.onrender.com/api';
const baseUrlDev = 'http://localhost:5010/api';

export const environment = {
  production: isProd,

  // User Authentication
  apiUrlAuth: isProd
    ? `${baseUrlProd}/Auth`
    : `${baseUrlDev}/Auth`,

  // Books API
  apiUrlBooks: isProd
    ? `${baseUrlProd}/Books`
    : `${baseUrlDev}/Books`,

  // Quotes API
  apiUrlQuotes: isProd
    ? `${baseUrlProd}/Quotes`
    : `${baseUrlDev}/Quotes`
};
