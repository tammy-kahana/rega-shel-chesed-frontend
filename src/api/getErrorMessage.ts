import axios from "axios"

export const getErrorMessage = (error: unknown): string => {

    if (axios.isAxiosError(error) && error.response?.data?.message) {
        return error.response.data.message;
    }
    return "אירעה שגיאה, נסו שוב";
}