import { useMutation } from 'react-query';
import { createPdf } from 'services/api/aws';

export const useGeneratePdf = () =>
  useMutation(createPdf);
