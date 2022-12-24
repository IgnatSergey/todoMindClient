import type { RootState } from './store'

export const getChatId = (state: RootState) => {
  return state.user.chatId;
};

export const getSubscribeStatus = (state: RootState) => {
  return state.user.subscribeStatus;
};