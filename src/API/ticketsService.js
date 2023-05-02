import API from './API';

// const tokens = {
//     access: localStorage.getItem('access') ?? '',
//     refresh: localStorage.getItem('refresh') ?? '',
// }

// export const config = {
//     headers: {
//         authorization: `Bearer ${tokens.refresh}`,
//     }
// }

// axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;

export async function getTickets() {
    const response = await API.get(`tickets`);
    return response;
}

export async function sendTicket(fromLanguage, toLanguage) {
    const response = await API.post(`tickets`, JSON.stringify({fromLanguage, toLanguage}));
    const newTicket = await response.data;
    return newTicket;
}

export async function removeTicket(id) {
    const response = await API.delete(`tickets/${id}`);
    return response.data;
}