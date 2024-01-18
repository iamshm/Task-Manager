import axios from 'axios';

const NotesApi = axios.create({
  baseURL: 'http://localhost:5000',
});

export default NotesApi;
