// src/environments.ts
const isProd = window.location.hostname !== 'localhost';

export const environment = {
    production: isProd,

    apiUrlAuth: isProd
        ? 'https://bookquoteapp-8pxm.onrender.com/api/Auth'
        : 'http://localhost:5010/api/Auth',

    apiUrlBooks: isProd
        ? 'https://bookquoteapp-8pxm.onrender.com/api/Books'
        : 'http://localhost:5010/api/Books',

    apiUrlQuotes: isProd
        ? 'https://bookquoteapp-8pxm.onrender.com/api/Quotes'
        : 'http://localhost:5010/api/Quotes'
};
