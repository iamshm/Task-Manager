import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import fetchMyNotes from '../apis/fetch-my-notes';
import fetchTags from '../apis/fetch-tags';
import { useAppConfigContext } from './app-config-context';

export interface Notes {
  category: string;
  uuid: string;
  title: string;
  description: string;
  id: number;
  color: string;
}
export type Tag = {
  category: string;
};

interface DataContextPros {
  notesList: Notes[];
  tags: Tag[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextPros>({
  notesList: [],
  tags: [],
  isLoading: false,
});

// TODO : To create a state that handles the selected tag and we pass that selected tag to the fetchNotes
// api call, and we run the useEffect that has fetchNotes in it by ading selected tag as a dependency
// or we directly call the api and setNotes list with the respinse

const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [notesList, setNotesList] = useState<Notes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const {
    appConfig: { userUuid },
  } = useAppConfigContext();

  const getTags = async () => {
    const res = await fetchTags({
      userUuid,
    });

    setTags(res);
  };

  const fetchNotes = async () => {
    const res = await fetchMyNotes({
      userUuid,
    });

    setNotesList(res);
  };
  useEffect(() => {
    setIsLoading(true);

    fetchNotes();
    getTags();

    setIsLoading(false);
  }, []);

  return (
    <DataContext.Provider
      value={{
        tags,
        notesList,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const useDataContext = () => useContext(DataContext);
