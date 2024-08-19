import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { UserScoreFields } from './useScoreForm';

type UserScore = {
  users: UserScoreFields[];
};

export const useGetUserScore = (): UseQueryResult<UserScore> =>
  useQuery({
    queryKey: ['userScore'],
    queryFn: async () => {
      const { data: response } = await axios.get<UserScore>(
        'http://localhost:3000/'
      );
      return response;
    },
    refetchOnWindowFocus: false,
    retry: 3,
  });
