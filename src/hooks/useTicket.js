import { useState } from "react";

export function useTicket(callback) {
    const [error, setError] = useState('')

    const posting = async () => {
        try {
            await callback();
        } catch (error) {
            setError(error.message);
        }
    }
    return [posting, error]
}