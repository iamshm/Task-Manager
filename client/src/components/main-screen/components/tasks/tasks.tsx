import { useAppConfigContext } from '../../../../context/app-config-context';
import { useDataContext } from '../../../../context/data-context';
import styles from './styles.module.scss';

const Tasks = () => {
  const { toggleTaskDrawer, toggleFiltersDrawer } = useAppConfigContext();
  const { isLoading, notesList } = useDataContext();

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <p className={styles.title}>My Tasks</p>

        <div className={styles.buttonContainer}>
          <button className={styles.filterButton} onClick={toggleFiltersDrawer}>
            Open Filters
          </button>

          <button className={styles.addButton} onClick={toggleTaskDrawer}>
            Add Task
          </button>
        </div>
      </div>

      <div className={styles.itemContainer}>
        {isLoading ? (
          <>Loading</>
        ) : (
          notesList.map((item) => (
            <div
              key={item.id}
              className={styles.item}
              style={{
                backgroundColor: item.color,
              }}
            >
              {item.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
