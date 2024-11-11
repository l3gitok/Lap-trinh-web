import axios from 'axios';


const API_URL = 'http://localhost:3000/api/auth'; 


const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, 
});


const saveToken = (token) => {
  localStorage.setItem('auth_token', token);
};

const getToken = () => {
  return localStorage.getItem('auth_token'); 
};

const removeToken = () => {
  localStorage.removeItem('auth_token');
};


export const login = async (email, password) => {
  try {
    const response = await apiInstance.post('/login', { email, password });
    if (response.data.token) {
      saveToken(response.data.token); 
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại!';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Đăng ký
export const register = async (username, email, password) => {
  try {
    const response = await apiInstance.post('/register', { username, email, password });
    return response.data; 
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const isLoggedIn = () => {
  return getToken() !== null; 
};


export const logout = () => {
  removeToken(); 
};
