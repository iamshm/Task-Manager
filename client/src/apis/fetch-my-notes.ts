import NotesApi from './config';

const fetchMyNotes = async () => {
  const res = await NotesApi.get('/api/notes', {
    data: {
      userUuid: 'd1b81427-1e9d-492f-892e-9a5ff3a35811',
    },
  });

  return res.data;
};

export default fetchMyNotes;
