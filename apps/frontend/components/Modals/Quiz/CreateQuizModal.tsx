import { Button, Modal, Text } from '@mantine/core';
import { Prisma } from '@prisma/client';
import { FormikTextareaInput } from 'components/formik/FormikTextArea';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import { useModalProps } from 'context/mantine';
import { createQuizSchema } from 'domain/util/validation';
import { Form, Formik } from 'formik';
import { useQuizCreate } from 'hooks/api/quiz';

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const CreateQuizModal = ({ opened, onClose }: Props) => {
  const { modalProps } = useModalProps();
  const { initialValues, handleSubmit } = useQuizCreateModal(onClose);

  return (
    <Modal
      centered
      opened={opened}
      withCloseButton={false}
      onClose={onClose}
      {...modalProps}
    >
      <Text size="xl" mb={12}>
        Create a quiz
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createQuizSchema}
      >
        <Form>
          <FormikTextInput name="name" label="Name" />
          <FormikTextareaInput name="description" label="Description" />
          <Button type="submit" mt={24}>
            Submit
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

const useQuizCreateModal = (onClose: () => void) => {
  const { mutate } = useQuizCreate();

  const initialValues = {
    name: '',
    description: '',
  };

  const handleSubmit = (values: Prisma.QuizCreateWithoutOwnerInput) => {
    mutate(values);
    onClose();
  };

  return { initialValues, handleSubmit };
};
