import { ITask } from "../../types/types";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

interface ITaskListProps {
  chatId: number | null;
  subscribeStatus: boolean;
  tasks: ITask[];
  deleteTask: (
    task: ITask,
    isSubscribe: boolean,
    chatId: number | null
  ) => void;
  changeReadinessStatus: (
    task: ITask,
    isSubscribe: boolean,
    chatId: number | null
  ) => () => void;
}

export const TaskList: React.FC<ITaskListProps> = (props) => {
  return props.tasks.length === 0 ? (
    <div className="task-list__no-tasks">Задач нет</div>
  ) : (
    <ul className="task-list">
      {props.tasks.map((task, index) => (
        <li className="task-list__item" key={task.id}>
          <h2 className="task-list__item-header">{`${index + 1}. ${
            task.description
          }`}</h2>
          <div className="task-list__item-date">
            {`Добавлена: 
            ${task.date.toLocaleString("ru", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}`}
          </div>
          <div className="task-list__item-controll">
            <FormControlLabel
              className="formControlLabel"
              labelPlacement="start"
              control={
                <Checkbox
                  onChange={props.changeReadinessStatus(
                    {
                      ...task,
                      readinessStatus: !task.readinessStatus,
                    },
                    props.subscribeStatus,
                    props.chatId
                  )}
                  checked={task.readinessStatus}
                  color="success"
                />
              }
              label="Завершенно"
            />
            <Stack direction="row" spacing={2}>
              <Button
                size="small"
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={() =>
                  props.deleteTask(task, props.subscribeStatus, props.chatId)
                }
              >
                Удалить
              </Button>
            </Stack>
          </div>
        </li>
      ))}
    </ul>
  );
};
