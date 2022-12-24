import { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { getTasks } from "../../redux/tasc-selector";
import {
  changeReadinessStatusThunkCreator,
  deleteTaskThunkCreator,
  getTasksThunkCreator,
} from "../../redux/task-reducer";
import { ITask } from "../../types/types";
import { TaskList } from "./TaskList";
import { getChatId, getSubscribeStatus } from "../../redux/user-selector";

interface ITaskListContainerProps {
  tasks: ITask[];
  chatId: number | null;
  subscribeStatus: boolean;
  getTasksThunkCreator: () => void;
  deleteTaskThunkCreator: (
    task: ITask,
    isSubscribe: boolean,
    chatId: number | null
  ) => void;
  changeReadinessStatusThunkCreator: (
    task: ITask,
    isSubscribe: boolean,
    chatId: number | null
  ) => void;
}

const TaskListContainer: React.FC<ITaskListContainerProps> = (props) => {
  useEffect(() => {
    props.getTasksThunkCreator();
  }, []);

  const changeReadinessStatus =
    (task: ITask, isSubscribe: boolean, chatId: number | null) => () => {
      props.changeReadinessStatusThunkCreator(task, isSubscribe, chatId);
    };
  return (
    <TaskList
      tasks={props.tasks}
      chatId={props.chatId}
      subscribeStatus={props.subscribeStatus}
      deleteTask={props.deleteTaskThunkCreator}
      changeReadinessStatus={changeReadinessStatus}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    tasks: getTasks(state),
    chatId: getChatId(state),
    subscribeStatus: getSubscribeStatus(state),
  };
};

export default connect(mapStateToProps, {
  getTasksThunkCreator,
  deleteTaskThunkCreator,
  changeReadinessStatusThunkCreator,
})(TaskListContainer);
