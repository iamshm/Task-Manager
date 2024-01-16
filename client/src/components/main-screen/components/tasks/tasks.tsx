import { getRandomHexColor } from '../../../../utils/generate-random-colors';
import styles from './styles.module.scss';

interface ElementProps {
  toggleAddTask: () => void;
  toggleFilters: () => void;
}

const Tasks = ({ toggleAddTask, toggleFilters }: ElementProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <p className={styles.title}>My Tasks</p>

        <div className={styles.buttonContainer}>
          <button className={styles.filterButton} onClick={toggleFilters}>
            Open Filters
          </button>

          <button className={styles.addButton} onClick={toggleAddTask}>
            Add Task
          </button>
        </div>
      </div>

      <div className={styles.itemContainer}>
        {Array(80)
          .fill(1)
          .map((_item, index) => (
            <div
              key={index}
              className={styles.item}
              style={{
                backgroundColor: getRandomHexColor(),
              }}
            >
              {index}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tasks;
