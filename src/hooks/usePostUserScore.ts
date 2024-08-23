import { UserScoreFields } from './useScoreForm';
import { useMutation } from 'react-query';
import { httpClient } from '../helper';

const postUserScore = async (form: UserScoreFields) => {
  await httpClient.post('/user', {
    name: form.name.trim(),
    score: form.score,
  });
};

export const usePostUserScore = (onSuccess: () => void, onError: () => void) =>
  useMutation(postUserScore, { onSuccess, onError });
