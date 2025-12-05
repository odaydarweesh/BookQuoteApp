// src/environments.ts

const isProd = window.location.hostname !== 'localhost';

export const environment = {
  production: isProd,

  // User Authentication
  apiUrlAuth: isProd
    ? 'https://bookquoteapp-8pxm.onrender.com/api/Auth'
    : 'http://localhost:5010/api/Auth',

  // Books API
  apiUrlBooks: isProd
    ? 'https://bookquoteapp-8pxm.onrender.com/api/Books'
    : 'http://localhost:5010/api/Books',

  // Quotes API
  apiUrlQuotes: isProd
    ? 'https://bookquoteapp-8pxm.onrender.com/api/Quotes'
    : 'http://localhost:5010/api/Quotes'
};
