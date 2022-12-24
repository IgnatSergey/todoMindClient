import { userApi } from "../components/api/api";
import { Dispatch } from "react";

enum UserActionType {
  CHANGE_SUBSCRIBE_STATUS = "CHANGE-SUBSCRIBE-STATUS",
  SET_CHATID = "SET-CHATID",
}

interface IUserState {
  chatId: number | null;
  subscribeStatus: boolean;
}

interface setChatIdAction {
  type: UserActionType.SET_CHATID;
  chatId: number | null;
}

interface changeSubscribeStatusAction {
  type: UserActionType.CHANGE_SUBSCRIBE_STATUS;
  subscribeStatus: boolean;
}

type UserAction = setChatIdAction | changeSubscribeStatusAction;

let initialState: IUserState = {
  subscribeStatus: false,
  chatId: null,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionType.CHANGE_SUBSCRIBE_STATUS:
      return {
        ...state,
        subscribeStatus: action.subscribeStatus,
      };
    case UserActionType.SET_CHATID:
      return {
        ...state,
        chatId: action.chatId,
      };
    default:
      return state;
  }
};

export const setChatId = (chatId: number | null): setChatIdAction => {
  return { type: UserActionType.SET_CHATID, chatId };
};

export const changeSubscribeStatus = (
  subscribeStatus: boolean
): changeSubscribeStatusAction => {
  return { type: UserActionType.CHANGE_SUBSCRIBE_STATUS, subscribeStatus };
};

export const registrateTgThunkCreator = (password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const chatId = await userApi.registrateTg(password);
      dispatch(setChatId(chatId));
    } catch (error) {}
  };
};

export const getSubscribeStatusThunkCreator = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const subscribeStatus = userApi.getSubscribeStatus();
      dispatch(changeSubscribeStatus(subscribeStatus));
    } catch (error) {}
  };
};

export const getChatIdThunkCreator = () => {
    return async (dispatch: Dispatch<UserAction>) => {
      try {
        const chatId = userApi.getChatId();
        dispatch(setChatId(chatId));
      } catch (error) {}
    };
  };

export const addSubscribeStatusThunkCreator = (subscribeStatus: boolean) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      userApi.addSubscribeStatus(subscribeStatus);
      dispatch(changeSubscribeStatus(subscribeStatus));
    } catch (error) {}
  };
};

export default userReducer;
