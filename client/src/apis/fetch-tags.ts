import NotesApi from './config';

interface FetchMyNotesProps {
  userUuid: string;
}

const fetchTags = async ({ userUuid }: FetchMyNotesProps) => {
  const res = await NotesApi.get(`/api/notes/tags`, {
    params: {
      userUuid,
    },
  });

  return res.data;
};

export default fetchTags;
