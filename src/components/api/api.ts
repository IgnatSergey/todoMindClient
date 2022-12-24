import { ITask } from "../../types/types";
import axios from "axios";

const host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const taskApi = {
  addTask(task: ITask, isSubscribe: boolean, chatId: number | null) {
    return host.post(`task`, { task, isSubscribe, chatId }).then((response) => {
      localStorage.setItem(task.id, JSON.stringify(task));
      return response.data;
    });
  },

  changeStatusTask(task: ITask, isSubscribe: boolean, chatId: number | null) {
    return host.put(`task`, { task, isSubscribe, chatId }).then((response) => {
      localStorage.setItem(task.id, JSON.stringify(task));
      return response.data;
    });
  },

  getLastId() {
    return localStorage.getItem("lastId")
      ? Number(localStorage.getItem("lastId"))
      : 0;
  },

  addLastId(lastId: number) {
    localStorage.setItem("lastId", lastId.toString());
  },

  getTasks() {
    let tasks: ITask[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("id")) {
        const value = localStorage.getItem(key);
        if (value) {
          const taskObject = JSON.parse(value);
          taskObject.date = new Date(taskObject.date);
          tasks.push(taskObject);
        }
      }
    }
    return tasks;
  },

  deleteTask(task: ITask, isSubscribe: boolean, chatId: number | null) {
    return host
      .put(`task/delete`, { task, isSubscribe, chatId })
      .then((response) => {
        localStorage.setItem(task.id, JSON.stringify(task));
        localStorage.removeItem(task.id);
        return response.data;
      });
  },
};

export const userApi = {
  getSubscribeStatus() {
    return localStorage.getItem("subscribeStatus") === "true" ? true : false;
  },

  registrateTg(password: string) {
    return host.post(`chatId`, { password }).then((response) => {
      localStorage.setItem("chatId", response.data);
      return response.data;
    });
  },

  getChatId() {
    return localStorage.getItem("chatId")
      ? Number(localStorage.getItem("chatId"))
      : null;
  },

  addSubscribeStatus(subscribeStatus: boolean) {
    localStorage.setItem("subscribeStatus", subscribeStatus.toString());
  },

  addChatId(chatId: number) {
    localStorage.setItem("chatId", chatId.toString());
  },
};
