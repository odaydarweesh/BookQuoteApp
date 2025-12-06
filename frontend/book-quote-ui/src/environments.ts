// src/environments.ts

const isProd = window.location.hostname !== 'localhost';

export const environment = {
  production: isProd,

  // User Authentication
  apiUrlAuth: isProd
    ? 'https://book-quote-api.onrender.com/api/Auth'
    : 'http://localhost:5010/api/Auth',

  // Books API
  apiUrlBooks: isProd
    ? 'https://book-quote-api.onrender.com/api/Books'
    : 'http://localhost:5010/api/Books',

  // Quotes API
  apiUrlQuotes: isProd
    ? 'https://book-quote-api.onrender.com/api/Quotes'
    : 'http://localhost:5010/api/Quotes'
};
