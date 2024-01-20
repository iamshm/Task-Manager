import { FormEvent, useState } from 'react';
import createNotes from '../../../../apis/create-note';
import { useAppConfigContext } from '../../../../context/app-config-context';
import { getRandomHexColor } from '../../../../utils/generate-random-colors';
import ResizeableTextarea from './components/resizeable-textarea';
import styles from './styles.module.scss';

interface FormProps {
  title: string;
  description: string;
}

const INITIAL_STATE: FormProps = {
  title: '',
  description: '',
};

const AddTask = () => {
  const {
    appConfig: { userUuid, isTaskDrawerOpen: isAddTaskOpen },
    toggleTaskDrawer: onClose,
  } = useAppConfigContext();

  const [formValues, setFormValues] = useState<FormProps>(INITIAL_STATE);

  const getClassName = () => {
    if (isAddTaskOpen) {
      return `${styles.container} ${styles.entry}`;
    }
    return `${styles.container} ${styles.exit}`;
  };

  const addTask = async () => {
    await createNotes({
      userUuid,
      payload: {
        category: '',
        title: formValues.title,
        description: formValues.description,
        color: getRandomHexColor(),
      },
    });

    setFormValues({
      title: '',
      description: '',
    });

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
          <button disabled={!formValues.title.length} onClick={addTask}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
