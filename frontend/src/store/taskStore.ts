import { create } from "zustand";

import {
  fetchAllTasks,
  fetchTaskById,
  addTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import { TaskT } from "../types/task";

type TaskState = {
  tasks: TaskT[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  createTask: (task: Omit<TaskT, "_id">) => Promise<void>;
  editTask: (id: string, updatedTask: Partial<TaskT>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const tasks = await fetchAllTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchTaskById: async (id: string) => {
    set({ loading: true });
    try {
      const task = await fetchTaskById(id);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  createTask: async (task: Omit<TaskT, "id">) => {
    set({ loading: true });
    try {
      const newTask = await addTask(task);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  editTask: async (id: string, updatedTask: Partial<TaskT>) => {
    set({ loading: true });
    try {
      const task = await updateTask(id, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  removeTask: async (id: string) => {
    set({ loading: true });
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
