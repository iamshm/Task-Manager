import NotesApi from './config';

interface CreateNotesProps {
  userUuid: string;
  payload: {
    category: string;
    title: string;
    description: string;
    color: string;
  };
}

const createNotes = async ({ userUuid, payload }: CreateNotesProps) => {
  const res = await NotesApi.post('/api/notes', {
    userUuid,
    payload,
  });

  return res.data;
};

export default createNotes;
