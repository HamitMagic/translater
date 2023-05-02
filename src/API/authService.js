import API from './API';

export async function auth(email, password) {
    console.log('auth')
    const response = await API.post('login', {email, password});
    return response;
}

export async function registration(email, password) {
    console.log('rega')
    const response = await API.post('registration', {email, password});
    console.log('rega')
    return response;
}

export async function logout() {
    const response = await API.post('logout');
    return response;
}

