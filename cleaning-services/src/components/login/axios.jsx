import axios from 'axios'


export default axios.create({
    baseURL: 'http://localhost:4107',
    withCredentials: true,
});