import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

/*
  TODO
  - auth header
  - interceptors
  - refresh token
*/
