const API_URL = import.meta.env.VITE_API_PREFIX_URL || process.env.NEXT_PUBLIC_API_URL; // Adjust based on environment

export const postRequest = async (endpoint: string, data: any) => {
    const authToken = localStorage.getItem('accessToken');
    console.log(data)
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { Authorization: `Bearer ${authToken}` }),
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error(`Error in POST ${endpoint}:`, result);
            throw new Error(result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        console.error(`Error in POST request to ${endpoint}:`, error);
        throw error;
    }
};
