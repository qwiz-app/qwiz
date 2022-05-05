import { Button, Modal, Text } from '@mantine/core';
import { FormikTextareaInput } from 'components/formik/FormikTextArea';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import { useModalProps } from 'context/mantine';
import { createQuizSchema } from 'domain/util/validation';
import { Form, Formik, FormikValues } from 'formik';

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const CreateQuizModal = ({ opened, onClose }: Props) => {
  const { modalProps } = useModalProps();
  const { initialValues, handleSubmit } = useCreateQuizModal();

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
          <FormikTextInput name="title" label="Title" />
          <FormikTextareaInput name="description" label="Description" />
          <Button type="submit" mt={24}>
            Submit
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

const useCreateQuizModal = () => {
  const initialValues = {
    title: '',
    description: '',
  };

  const handleSubmit = (values: FormikValues) => console.log(values);
  return { initialValues, handleSubmit };
};
