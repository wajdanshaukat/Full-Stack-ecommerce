import axios from 'axios';

const API_URL = 'http://localhost:8000/';


export const registerUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return response.data;
  };


export const loginUser = async (email, password) => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const response = await axios.post(`${API_URL}/login`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  return response.data;
};
