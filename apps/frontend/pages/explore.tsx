import { Formik, FormikValues } from 'formik';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { ExampleForm } from 'components/formik/ExampleForm';
import { exampleSchema } from 'domain/util/validation';

type Props = Record<string, never>;

const ExplorePage = (props: Props) => {
  const { initialValues, handleSubmit } = useExplorePage(props);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={exampleSchema}
    >
      <ExampleForm />
    </Formik>
  );
};

const useExplorePage = (props: Props) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    country: undefined,
    programmers: [],
    animal: '',
    terms: [],
    termsAndCon: false,
    radio: undefined,
  };

  const handleSubmit = (values: FormikValues) => console.log(values);

  return { initialValues, handleSubmit };
};

export default ExplorePage;

ExplorePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
