import { useForm } from 'react-hook-form';
import { usePostUserScore } from './usePostUserScore';
import { useScoreSlice } from '../store/score.store';
import { ScreenState, useScreenSlice } from '../store/screen.store';
import toast from 'react-hot-toast';

export type UserScoreFields = {
  name: string;
  score: number;
};

export const useUserScoreForm = () => {
  const scoreSlice = useScoreSlice();
  const screenSlice = useScreenSlice();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<UserScoreFields>({
    defaultValues: {
      name: '',
      score: scoreSlice.score,
    },
    mode: 'onChange',
  });

  const onSuccess = () => screenSlice.setScreenState(ScreenState.LEADERBOARD);
  const onError = () => {
    toast.error('Failed to post score', {
      duration: 4000,
      position: 'top-center',
    });
  };

  const { mutateAsync: postUserScore } = usePostUserScore(onSuccess, onError);

  const onSubmit = handleSubmit(async () => {
    void postUserScore(getValues());
  });
  return { register, errors, onSubmit };
};
