import axios from 'axios';

const fetcher = axios.create({ baseURL: __API_URL__ });

export default fetcher;
