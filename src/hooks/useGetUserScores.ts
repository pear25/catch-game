import { useQuery, UseQueryResult } from 'react-query';
import { UserScoreFields } from './useScoreForm';
import { httpClient } from '../helper';

type UserScore = {
  users: UserScoreFields[];
};

export const useGetUserScore = (): UseQueryResult<UserScore> =>
  useQuery({
    queryKey: ['userScore'],
    queryFn: async () => {
      const { data: response } = await httpClient.get<UserScore>('/user');
      return response;
    },
    refetchOnWindowFocus: false,
    retry: 3,
  });
