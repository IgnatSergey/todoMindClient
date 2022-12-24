import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface ISubscriberFormProp {
  chatId: number | null;
  subscribeStatus: boolean;
  password: string;
  onSubscribe: (subscribeStatus: boolean) => void;
  onRegistrate: (password: string) => void;
}

export const SubscriberForm: React.FC<ISubscriberFormProp> = (props) => {
  const [isRegistrate, setIsRegistrate] = useState(false);

  const onRegistrateInfo = (isRegistrate: boolean) => {
    setIsRegistrate(isRegistrate);
  };
  return props.chatId ? (
    <FormControlLabel
      className="formControlLabel"
      labelPlacement="start"
      control={
        <Checkbox
          onChange={() => props.onSubscribe(!props.subscribeStatus)}
          checked={props.subscribeStatus}
        />
      }
      label="Получать уведомления"
    />
  ) : (
    <>
      {!isRegistrate ? (
        <button
          onClick={() => {
            onRegistrateInfo(true);
            props.onRegistrate(props.password);
          }}
          className="button-subscribeInfo"
        >
          Чтобы быть в курсе изменений подпишитесь на телеграм-бот
        </button>
      ) : (
        <>
          <p className="tgRegistrate-info">
            {`Чтобы зарегестрироваться отправте ${props.password} на`}
            <a
              className="tgBotLink"
              href="https://t.me/TodoMindBot"
              target="blank"
            >
              @TodoMindBot
            </a>{" "}
          </p>
        </>
      )}
    </>
  );
};
