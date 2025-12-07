import axios from "axios";
import Cookies from "js-cookie";

// Створення окремого інстансу Axios
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL + "/v1/",
	headers: {
		"Content-Type": "application/json",
	},
});

// Якщо токен доступний у змінній середовища -- додаємо в Authorization
const token = Cookies.get("token");
if (token) {
	apiClient.defaults.headers.common["Authorization"] = `${token}`;
}

// Інтерцептор для відповіді (обробка помилок)
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Тут можна додати глобальну обробку помилок

		console.error("API Error:", error.response?.data || error.message);

		if (error.response.status === 401) {
			window.location.href = "/login";
		}
		// Можна також виводити повідомлення користувачу через toast
		// toast.error(error.response?.data?.message || 'Unknown error');
		return Promise.reject(error);
	}
);
export default apiClient;
