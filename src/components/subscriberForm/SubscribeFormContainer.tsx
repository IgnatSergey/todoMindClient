import { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addSubscribeStatusThunkCreator,
  getChatIdThunkCreator,
  getSubscribeStatusThunkCreator,
  registrateTgThunkCreator,
} from "../../redux/user-reducer";
import { getChatId, getSubscribeStatus } from "../../redux/user-selector";
import { getPassword } from "../../utils/getRandom";
import { SubscriberForm } from "./SubscriberForm";

interface ISubscribeFormContainerProp {
  chatId: number | null;
  subscribeStatus: boolean;
  addSubscribeStatusThunkCreator: (subscribeStatus: boolean) => void;
  getSubscribeStatusThunkCreator: () => void;
  registrateTgThunkCreator: (password: string) => void;
  getChatIdThunkCreator: () => void;
}

const SubscribeFormContainer: React.FC<ISubscribeFormContainerProp> = (
  props
) => {
  useEffect(() => {
    props.getChatIdThunkCreator();
    props.getSubscribeStatusThunkCreator();
  }, []);

  return (
    <SubscriberForm
      chatId={props.chatId}
      subscribeStatus={props.subscribeStatus}
      onRegistrate={props.registrateTgThunkCreator}
      onSubscribe={props.addSubscribeStatusThunkCreator}
      password={getPassword(4)}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    chatId: getChatId(state),
    subscribeStatus: getSubscribeStatus(state),
  };
};

export default connect(mapStateToProps, {
  addSubscribeStatusThunkCreator,
  getSubscribeStatusThunkCreator,
  registrateTgThunkCreator,
  getChatIdThunkCreator,
})(SubscribeFormContainer);
