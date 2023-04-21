import axios from "axios";
import { useState } from "react";
import { URL } from "../API/API";

export function useFetch(callback) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState('')
    const fetching = async () => {
        try {
            setIsLoaded(true)
            await callback()
        } catch (error) {
            setError(error.response?.data.message);
        } finally {
            setIsLoaded(false)
        }
    }
    return [fetching, isLoaded, error]
}

async function refreshToken() {
    let result;
    try {
        result = await axios.get(`${URL}refresh`);
        if (result.ok) {
            localStorage.setItem('access', result)
        };
    } catch (error) {
        console.log(222222222222, error.message)
    }
    return result;
}