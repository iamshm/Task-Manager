import styles from './styles.module.scss';

interface ElementProps {
  isFiltersOpen: boolean;
}

const Sidebar = ({ isFiltersOpen }: ElementProps) => {
  const getClassName = () => {
    if (isFiltersOpen) {
      return `${styles.container} ${styles.entry}`;
    }
    return `${styles.container} ${styles.exit}`;
  };

  return (
    <div className={getClassName()}>
      <div className={styles.itemContainer}>
        {isFiltersOpen &&
          Array(3)
            .fill(1)
            .map((_item, index) => (
              <button key={index} className={styles.item}>
                {index}
              </button>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
