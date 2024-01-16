import Sidebar from './components/sidebar';
import AddTask from './components/add-task';
import Tasks from './components/tasks';
import styles from './styles.module.scss';
import { useState } from 'react';

const MainScreen = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleAddTask = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className={styles.container}>
      <p className={styles.logoText}>Noted</p>

      <div className={styles.content}>
        <Sidebar isFiltersOpen={isFiltersOpen} />

        <Tasks toggleAddTask={toggleAddTask} toggleFilters={toggleFilters} />

        <AddTask isAddTaskOpen={isAddTaskOpen} onClose={toggleAddTask} />
      </div>
    </div>
  );
};

export default MainScreen;
