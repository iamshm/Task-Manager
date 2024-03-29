import NotesApi from './config';

interface FetchMyNotesProps {
  userUuid: string;
}

const fetchMyNotes = async ({ userUuid }: FetchMyNotesProps) => {
  const res = await NotesApi.get(`/api/notes`, {
    params: {
      userUuid,
    },
  });

  return res.data;
};

export default fetchMyNotes;
