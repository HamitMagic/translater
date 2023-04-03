import axios from 'axios';

export async function ticketsService(fromLanguage, toLanguage) {
    const response = await axios(fromLanguage 
        ?   {
                method: 'post',
                url: 'http://192.168.0.104:5000/api/tickets',
                body: {"fromLanguage": fromLanguage, "toLanguage": toLanguage}
            }
        : 'http://192.168.0.104:5000/api/tickets');
    return response;
}

export default ticketsService;