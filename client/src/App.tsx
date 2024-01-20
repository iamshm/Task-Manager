import MainScreen from './components/main-screen';
import AppConfigContextProvider from './context/app-config-context';
import DataContextProvider from './context/data-context';

const App = () => {
  return (
    <AppConfigContextProvider>
      <DataContextProvider>
        <MainScreen />
      </DataContextProvider>
    </AppConfigContextProvider>
  );
};

export default App;
