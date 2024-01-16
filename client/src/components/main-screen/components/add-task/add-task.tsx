import styles from './styles.module.scss';

interface ElementProps {
  isAddTaskOpen: boolean;
  onClose: () => void;
}

const AddTask = ({ isAddTaskOpen, onClose }: ElementProps) => {
  const getClassName = () => {
    if (isAddTaskOpen) {
      return `${styles.container} ${styles.entry}`;
    }
    return `${styles.container} ${styles.exit}`;
  };

  return <div className={getClassName()}></div>;
};

export default AddTask;
