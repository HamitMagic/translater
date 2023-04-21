import axios from 'axios';
import {URL} from './API';

const tokens = {
    access: localStorage.getItem('access') ?? '',
    refresh: localStorage.getItem('refresh') ?? '',
}

// export const config = {
//     headers: {
//         authorization: `Bearer ${tokens.refresh}`,
//     }
// }

// axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;

export async function refreshToken() {
    const response = await axios.get(`${URL}refresh`);
    console.log(response)
    return response;
}

export async function getTickets(token) {
    const response = await axios.get(`${URL}tickets`, {headers: {
            Authorization: `Bearer ${token}`,
        }});
    return response;
}

export async function sendTicket(fromLanguage, toLanguage, token) {
    const response = await axios.post(`${URL}tickets`, {fromLanguage, toLanguage,}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    const newTicket = await response.data;
    return newTicket;
}

export async function removeTicket(id, token) {
    const response = await axios.delete(`${URL}tickets/${id}`, {headers: {
        Authorization: `Bearer ${token}`,
    }});
    return response.data;
}