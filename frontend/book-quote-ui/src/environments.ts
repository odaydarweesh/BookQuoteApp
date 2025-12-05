// src/environments.ts

const isProd = window.location.hostname !== 'localhost';

const baseUrlProd = 'https://book-quote-api.onrender.com/api';
const baseUrlDev = 'https://localhost:7001/api';

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
