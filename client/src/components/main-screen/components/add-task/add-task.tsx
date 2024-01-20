import { FormEvent, useState } from 'react';
import { SingleValue } from 'react-select';
import ReactSelectCreatable from 'react-select/creatable';
import createNotes from '../../../../apis/create-note';
import { useAppConfigContext } from '../../../../context/app-config-context';
import { useDataContext } from '../../../../context/data-context';
import { getRandomHexColor } from '../../../../utils/generate-random-colors';
import ResizeableTextarea from './components/resizeable-textarea';
import styles from './styles.module.scss';

interface FormProps {
  title: string;
  description: string;
  tag: string;
}

interface OptionSelect {
  label: string;
  value: string;
}

const INITIAL_STATE: FormProps = {
  title: '',
  description: '',
  tag: '',
};

const AddTask = () => {
  const {
    appConfig: { userUuid, isTaskDrawerOpen: isAddTaskOpen },
    toggleTaskDrawer: onClose,
  } = useAppConfigContext();

  const { tags: tagsFromContext } = useDataContext();

  const [formValues, setFormValues] = useState<FormProps>(INITIAL_STATE);

  const getClassName = () => {
    if (isAddTaskOpen) {
      return `${styles.container} ${styles.entry}`;
    }
    return `${styles.container} ${styles.exit}`;
  };

  const options = tagsFromContext.map((tag) => {
    return {
      label: tag.category,
      value: tag.category,
    };
  });

  const addTask = async () => {
    await createNotes({
      userUuid,
      payload: {
        category: formValues.tag,
        title: formValues.title,
        description: formValues.description,
        color: getRandomHexColor(),
      },
    });

    setFormValues({
      title: '',
      description: '',
      tag: '',
    });

    onClose();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const getValue = (value?: string) => {
    if (!value) return null;

    return {
      label: value,
      value,
    };
  };

  const handleTagChange = (selectedOption: SingleValue<OptionSelect>) => {
    if (!selectedOption) return;

    setFormValues((prev) => {
      return {
        ...prev,
        tag: selectedOption.value,
      };
    });
  };

  const handleCreateOption = (tag: string) => {
    setFormValues((prev) => {
      return {
        ...prev,
        tag,
      };
    });
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
          <ReactSelectCreatable
            options={options}
            value={getValue(formValues.tag)}
            onChange={(newValue) => handleTagChange(newValue)}
            onCreateOption={handleCreateOption}
            placeholder="Select or create tags..."
          />

          <button disabled={!formValues.title.length} onClick={addTask}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
