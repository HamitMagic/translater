import API from './API';

export async function auth(email, password) {
    const response = await API.post('login', {email, password});
    return response;
}

export async function registration(email, password) {
    const response = await API.post('registration', {email, password});
    return response;
}

export async function logout() {
    const response = await API.post('logout');
    return response;
}

