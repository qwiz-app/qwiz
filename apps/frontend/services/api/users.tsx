import { User } from '@prisma/client';
import { parseData } from 'lib/axios';
import http from 'services/http';

export const fetchUsers = () => http.get<User[]>('/api/users').then(parseData);
