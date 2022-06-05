import { LoadingOverlay, Modal } from '@mantine/core';
import { useModalProps } from 'context/mantine';
import { Formik } from 'formik';
import { useQuestionCreate } from 'hooks/api/question';
import { QuestionElementType } from '@prisma/client';
import { QuestionCreateFormValues } from 'types/forms/QuestionCreateFormValues';
import { CreateQuestionForm } from 'components/Quiz/QuizQuestion/QuizQuestionCreateModal/CreateQuestionForm';
import { useCategories } from 'hooks/api/categories';
import { questionSchema } from 'domain/util/validation';

export const QuestionCreateModal = ({ opened, setOpened }) => {
  const { initialValues, categories, modalProps, isLoading, handleSubmit } =
    useQuestionCreateModal(setOpened);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a new question"
      {...modalProps}
    >
      <LoadingOverlay visible={isLoading} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={questionSchema}
      >
        <CreateQuestionForm categories={categories} />
      </Formik>
    </Modal>
  );
};

function useQuestionCreateModal(setOpened) {
  const { mutate: createQuestion, isLoading } = useQuestionCreate();
  const { modalProps } = useModalProps();

  const { data: categories = [] } = useCategories();

  const initialValues: QuestionCreateFormValues = {
    textuals: [{ content: '', type: QuestionElementType.TEXT }],
    images: [{ content: '', type: QuestionElementType.IMAGE }],
    categories: [],
    answers: [{ answer: '' }],
  };

  const handleSubmit = async (values: QuestionCreateFormValues) => {
    const { textuals, images, answers, ...rest } = values;
    const contents = [
      ...textuals.filter((t) => t.content),
      ...images.filter((i) => i.content),
    ];
    await createQuestion(
      { ...rest, contents, answers: answers.filter((a) => a.answer) },
      { onSuccess: () => setOpened(false) }
    );
  };

  return { initialValues, categories, modalProps, isLoading, handleSubmit };
}
