import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTasks = async (limit: number = 10) => {
  try {
    const response = await axios.get(`${API_URL}?_limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

export const addTask = async (title: string) => {
  try {
    const response = await axios.post(API_URL, {
      title,
      completed: false,
      userId: 1, // required by the API
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add task');
  }
};

export const toggleTask = async (id: number, completed: boolean) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { completed });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};