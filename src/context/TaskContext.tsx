import React, {createContext, useContext, useState, useEffect} from 'react';
import {getTasks, addTask, toggleTask, deleteTask} from '../services/api';
import Toast from 'react-native-toast-message';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  handleAddTask: (title: string) => Promise<void>;
  handleToggleTask: (id: number, completed: boolean) => Promise<void>;
  handleDeleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error instanceof Error ? error.message : 'Failed to fetch tasks',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string) => {
    setLoading(true);
    try {
      const newTask = await addTask(title);
      setTasks([...tasks, newTask]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task added successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error instanceof Error ? error.message : 'Failed to add task',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    setLoading(true);
    try {
      await toggleTask(id, completed);
      setTasks(
        tasks.map(task => (task.id === id ? {...task, completed} : task)),
      );
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error instanceof Error ? error.message : 'Failed to update task',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setLoading(true);
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task deleted successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error instanceof Error ? error.message : 'Failed to delete task',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        handleAddTask,
        handleToggleTask,
        handleDeleteTask,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
