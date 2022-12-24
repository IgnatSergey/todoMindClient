import { Formik, Field, Form } from "formik";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { getLastId } from "../../redux/tasc-selector";
import { addTaskThunkCreator } from "../../redux/task-reducer";
import { ITask } from "../../types/types";
import { getChatId, getSubscribeStatus } from "../../redux/user-selector";
import { validateRequired } from "../common/validator";

interface ITaskFormProps {
  lastId: number;
  chatId: number | null;
  subscribeStatus: boolean;
  addTask: (
    task: ITask,
    lastId: number,
    isSubscribe: boolean,
    chatId: number | null
  ) => void;
}

interface ITaskFormValues {
  description: string;
}

export const TaskForm: React.FC<ITaskFormProps> = (props) => {
  const initialValues: ITaskFormValues = { description: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const date = new Date();
        const task = {
          id: `id${props.lastId + 1}`,
          description: values.description,
          date,
          readinessStatus: false,
        };
        props.addTask(
          task,
          props.lastId + 1,
          props.subscribeStatus,
          props.chatId
        );
        actions.resetForm({ values: { description: "" } });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="task-form">
            <div className="task-form__input-wrapper">
              <label htmlFor="description">Задача:</label>
              <div className="input-wrapper">
                <Field
                  className="task-form__input"
                  name="description"
                  component="textarea"
                  id="description"
                  validate={validateRequired}
                />
                {errors.description && touched.description && (
                  <div className="input__error-message">
                    {errors.description}
                  </div>
                )}
              </div>
            </div>
            <button type="submit">Добавить задачу</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

interface IAddTaskFormProps {
  lastId: number;
  chatId: number | null;
  subscribeStatus: boolean;
  addTaskThunkCreator: (
    task: ITask,
    lastId: number,
    isSubscribe: boolean,
    chatId: number | null
  ) => void;
}

const AddTaskForm: React.FC<IAddTaskFormProps> = (props) => {
  return (
    <TaskForm
      lastId={props.lastId}
      chatId={props.chatId}
      subscribeStatus={props.subscribeStatus}
      addTask={props.addTaskThunkCreator}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    lastId: getLastId(state),
    chatId: getChatId(state),
    subscribeStatus: getSubscribeStatus(state),
  };
};

export default connect(mapStateToProps, {
  addTaskThunkCreator,
})(AddTaskForm);
