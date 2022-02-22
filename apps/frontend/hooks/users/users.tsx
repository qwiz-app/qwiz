import { User } from '@prisma/client';
import { fetchUsers } from 'services/api/users';
import { useQuery } from 'react-query';

export const useUsers = () => useQuery<User[]>(['users'], fetchUsers);
