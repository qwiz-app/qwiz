import { LoadingOverlay, Modal } from '@mantine/core';
import { useModalProps } from 'context/mantine';
import { Formik } from 'formik';
import { useQuestionCreate } from 'hooks/api/question';
import { QuestionElementType } from '@prisma/client';
import { QuestionCreateFormValues } from 'types/forms/QuestionCreateFormValues';
import { CreateQuestionForm } from 'components/Quiz/QuizQuestion/QuizQuestionCreateModal/CreateQuestionForm';
import { useCategories } from 'hooks/api/categories';

export const QuestionCreateModal = ({ opened, setOpened }) => {
  const { initialValues, categories, modalProps, isLoading, handleSubmit } =
    useQuestionCreateModal();

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a new question"
      {...modalProps}
    >
      <LoadingOverlay visible={isLoading} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <CreateQuestionForm categories={categories} />
      </Formik>
    </Modal>
  );
};

function useQuestionCreateModal() {
  const { mutate: createQuestion, isLoading } = useQuestionCreate();
  const { modalProps } = useModalProps();

  const { data: categories = [] } = useCategories();

  const initialValues: QuestionCreateFormValues = {
    textuals: [{ content: '', type: QuestionElementType.TEXT }],
    images: [{ content: '', type: QuestionElementType.IMAGE }],
    categories: [],
  };

  const handleSubmit = async (values: QuestionCreateFormValues) => {
    const { textuals, images } = values;
    const contents = [...textuals, ...images];
    await createQuestion({ contents });
  };

  return { initialValues, categories, modalProps, isLoading, handleSubmit };
}
