import { useRouter } from 'next/router';
import { paths } from 'paths';
import { useMutation } from 'react-query';
import { deleteCurrentUser } from 'services/api/users';

export const useCurrentUserDelete = () => {
  const router = useRouter();

  return useMutation(deleteCurrentUser, {
    //   TODO: isnt ran
    onMutate: () => {
      console.log('redirect to signout');
      router.replace(paths.signIn());
    },
  });
};
