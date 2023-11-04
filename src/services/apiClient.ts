// create apiClient with swr
import axios from 'axios';

const baseURL = 'localhost:3000/api';

export const apiClient = axios.create({
  baseURL,
});

