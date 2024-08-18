import axios from 'axios';
import { UserScoreFields } from './useScoreForm';
import { useMutation } from 'react-query';

const postUserScore = async (form: UserScoreFields) => {
  await axios.post('http://localhost:3001/scores', form);
};

export const usePostUserScore = (onSuccess: () => void, onError: () => void) =>
  useMutation(postUserScore, { onSuccess, onError });
