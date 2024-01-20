import AddTask from './components/add-task';
import Sidebar from './components/sidebar';
import Tasks from './components/tasks';
import styles from './styles.module.scss';

const MainScreen = () => {
  return (
    <div className={styles.container}>
      <p className={styles.logoText}>Noted</p>

      <div className={styles.content}>
        <Sidebar />

        <Tasks />

        <AddTask />
      </div>
    </div>
  );
};

export default MainScreen;
