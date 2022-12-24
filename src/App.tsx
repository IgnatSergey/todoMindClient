import SubscriberFormContainer from "./components/subscriberForm/SubscribeFormContainer";
import AddTaskForm from "./components/taskForm/TaskForm";
import TaskListContainer from "./components/taskList/TaskListContainer";

export const App = () => {
  return (
    <>
      <div className="container header-container">
        <div className="header-wrapper">
          <SubscriberFormContainer />
        </div>
      </div>
      <div className="container content-container">
        <div className="content-wrapper">
          <TaskListContainer />
          <AddTaskForm />
        </div>
      </div>
    </>
  );
};
