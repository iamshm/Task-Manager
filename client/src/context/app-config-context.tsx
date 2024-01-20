import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AppConfigProps {
  isTaskDrawerOpen: boolean;
  isFilterDrawerOpen: boolean;
  userUuid: string;
}

interface AppConfigContextProps {
  appConfig: AppConfigProps;
  toggleTaskDrawer: () => void;
  toggleFiltersDrawer: () => void;
}

const appConfigInitialState: AppConfigProps = {
  isFilterDrawerOpen: false,
  isTaskDrawerOpen: false,
  userUuid: '',
};

const AppConfigContext = createContext<AppConfigContextProps>({
  appConfig: appConfigInitialState,
  toggleTaskDrawer: () => {},
  toggleFiltersDrawer: () => {},
});

AppConfigContext.displayName = 'AppConfig';
const NOTES_USER_ID = 'notesUserId';

const AppConfigContextProvider = ({ children }: { children: ReactNode }) => {
  const [appConfig, setAppConfig] = useState<AppConfigProps>(appConfigInitialState);

  const toggleTaskDrawer = () => {
    setAppConfig((prev) => {
      return {
        ...prev,
        isTaskDrawerOpen: !prev.isTaskDrawerOpen,
      };
    });
  };

  const toggleFiltersDrawer = () => {
    setAppConfig((prev) => {
      return {
        ...prev,
        isFilterDrawerOpen: !prev.isFilterDrawerOpen,
      };
    });
  };

  useEffect(() => {
    let userUuid = localStorage.getItem(NOTES_USER_ID);

    if (!userUuid) {
      localStorage.setItem(NOTES_USER_ID, crypto.randomUUID());

      userUuid = localStorage.getItem(NOTES_USER_ID);
    }

    setAppConfig((prev) => {
      return {
        ...prev,
        userUuid: userUuid as string,
      };
    });
  }, []);

  if (!appConfig.userUuid) return <></>;

  return (
    <AppConfigContext.Provider
      value={{
        appConfig,
        toggleFiltersDrawer,
        toggleTaskDrawer,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

export default AppConfigContextProvider;

export const useAppConfigContext = () => useContext(AppConfigContext);
