import { FormEvent, useState } from 'react';
import ResizeableTextarea from './components/resizeable-textarea';
import styles from './styles.module.scss';

interface ElementProps {
  isAddTaskOpen: boolean;
  onClose: () => void;
}

interface FormProps {
  title: string;
  description: string;
  completed: boolean;
}

const INITIAL_STATE: FormProps = {
  title: '',
  description: '',
  completed: false,
};

const AddTask = ({ isAddTaskOpen, onClose }: ElementProps) => {
  const [formValues, setFormValues] = useState<FormProps>(INITIAL_STATE);

  const getClassName = () => {
    if (isAddTaskOpen) {
      return `${styles.container} ${styles.entry}`;
    }
    return `${styles.container} ${styles.exit}`;
  };

  const handleCompletionToggle = () => {
    setFormValues((prev) => {
      return {
        ...prev,
        completed: !prev.completed,
      };
    });
  };

  const addTask = () => {
    console.log('task added', formValues);
    onClose();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={getClassName()}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            value={formValues.title}
            className={styles.titleInput}
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  title: e?.target.value || '',
                };
              });
            }}
            placeholder="Daily Tasks"
            name="title"
          />

          <ResizeableTextarea
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  description: e?.target.value || '',
                };
              });
            }}
            value={formValues.description}
            name="description"
            placeholder="go to the gym, wake up early, ..."
            rows={15}
          />
        </div>

        <div className={styles.actionContainer}>
          <button onClick={handleCompletionToggle}>
            {formValues.completed ? 'Mark as Pending' : 'Mark as Completed'}
          </button>

          <button onClick={addTask}>Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
