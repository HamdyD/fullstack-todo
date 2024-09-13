import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

import { TaskT } from "../types/task";

// Fetch all tasks
export const fetchAllTasks = async (): Promise<TaskT[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a task by ID
export const fetchTaskById = async (id: string): Promise<TaskT> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add new task
export const addTask = async (task: Omit<TaskT, "id">): Promise<TaskT> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update an existing task
export const updateTask = async (
  id: string,
  updatedTask: Partial<TaskT>
): Promise<TaskT> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
