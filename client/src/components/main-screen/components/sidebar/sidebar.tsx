import { useAppConfigContext } from '../../../../context/app-config-context';
import styles from './styles.module.scss';
import { useDataContext } from '../../../../context/data-context';

const Sidebar = () => {
  const {
    appConfig: { isFilterDrawerOpen },
  } = useAppConfigContext();

  const { tags } = useDataContext();

  const getClassName = () => {
    if (isFilterDrawerOpen) {
      return `${styles.container} ${styles.entry}`;
    }
    return `${styles.container} ${styles.exit}`;
  };

  return (
    <div className={getClassName()}>
      <div className={styles.itemContainer}>
        {isFilterDrawerOpen &&
          tags.map((item, index) => (
            <button key={index} className={styles.item}>
              {!item.category ? 'Untagged' : item.category}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
