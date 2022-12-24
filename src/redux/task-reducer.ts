import { ITask } from "./../types/types";
import { taskApi } from "../components/api/api";
import { Dispatch } from "react";

enum PointActionType {
  ADD_TASK = "ADD-TASK",
  GET_ALL_TASKS = "GET-ALL-TASKS",
  DELETE_TASK = "DELETE-TASK",
  GET_LASTID = "GET-LASTID",
  CHANGE_READINESS_STATUS = "CHANGE-READINESS-STATUS",
}

interface ITaskState {
  tasks: ITask[];
  lastId: number;
}

interface addTaskAction {
  type: PointActionType.ADD_TASK;
  task: ITask;
}

interface getAllTasksAction {
  type: PointActionType.GET_ALL_TASKS;
  tasks: ITask[];
}

interface deleteTaskAction {
  type: PointActionType.DELETE_TASK;
  taskId: string;
}

interface getLastIdAction {
  type: PointActionType.GET_LASTID;
  lastId: number;
}

interface changeReadinessStatusAction {
  type: PointActionType.CHANGE_READINESS_STATUS;
  taskId: string;
}

type TaskAction =
  | addTaskAction
  | getAllTasksAction
  | deleteTaskAction
  | getLastIdAction
  | changeReadinessStatusAction;

let initialState: ITaskState = {
  tasks: [],
  lastId: 0,
};

const taskReducer = (state = initialState, action: TaskAction) => {
  switch (action.type) {
    case PointActionType.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        lastId: state.lastId + 1,
      };
    case PointActionType.GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case PointActionType.DELETE_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks.filter((task) => {
            return task.id !== action.taskId;
          }),
        ],
      };
    case PointActionType.GET_LASTID:
      return {
        ...state,
        lastId: action.lastId,
      };
    case PointActionType.CHANGE_READINESS_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.taskId) {
            return { ...task, readinessStatus: !task.readinessStatus };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};

const addTask = (task: ITask): addTaskAction => {
  return { type: PointActionType.ADD_TASK, task };
};

const getAllTasks = (tasks: ITask[]): getAllTasksAction => {
  return { type: PointActionType.GET_ALL_TASKS, tasks };
};

const deleteTask = (taskId: string): deleteTaskAction => {
  return { type: PointActionType.DELETE_TASK, taskId };
};

const getLastId = (lastId: number): getLastIdAction => {
  return { type: PointActionType.GET_LASTID, lastId };
};

const changeReadinessStatus = (taskId: string): changeReadinessStatusAction => {
  return { type: PointActionType.CHANGE_READINESS_STATUS, taskId };
};

export const addTaskThunkCreator = (
  task: ITask,
  lastId: number,
  isSubscribe: boolean,
  chatId: number | null
) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    try {
      await taskApi.addTask(task, isSubscribe, chatId);
      dispatch(addTask(task));
      taskApi.addLastId(lastId);
      dispatch(getLastId(lastId));
    } catch (error) {}
  };
};

export const getTasksThunkCreator = () => {
  return (dispatch: Dispatch<TaskAction>) => {
    const lastId = taskApi.getLastId();
    dispatch(getLastId(lastId));
    const tasks = taskApi.getTasks();
    dispatch(getAllTasks(tasks));
  };
};

export const deleteTaskThunkCreator = (
  task: ITask,
  isSubscribe: boolean,
  chatId: number | null
) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    try {
      taskApi.deleteTask(task, isSubscribe, chatId);
      dispatch(deleteTask(task.id));
    } catch (error) {

    }
  };
};

export const changeReadinessStatusThunkCreator = (
  task: ITask,
  isSubscribe: boolean,
  chatId: number | null
) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    try {
      await taskApi.changeStatusTask(task, isSubscribe, chatId);
      dispatch(changeReadinessStatus(task.id));
    } catch (error) {

    }
  };
};

export default taskReducer;
