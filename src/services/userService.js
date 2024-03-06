import axios from '../axios';

//viết tắt
// const handleLoginApi = (email, password) => {
//     return axios.post('/api/login', { email, password });
// }

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

export { handleLoginApi }