import type { RootState } from './store'

export const getTasks = (state: RootState) => {
  return state.task.tasks;
};

export const getLastId = (state: RootState) => {
  return state.task.lastId;
};
