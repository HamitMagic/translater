import axios from 'axios';
const URL = "https://glacial-castle-71690.herokuapp.com/api/tickets";

export async function getTickets() {
    const response = await axios.get(URL);
    return response;
}

export async function sendTicket(fromLanguage, toLanguage) {
    const response = await axios.post(URL, {fromLanguage, toLanguage});
    const newTicket = await response.data;
    return newTicket;
}

export async function removeTicket(id) {
    console.log(id, 'in ticket Service')
    const response = await axios.delete(`${URL}/${id}`);
    console.log(id, 'тикет удален');
    console.log("-------------------------", response.data);
    return response.data;
}