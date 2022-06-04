import axios from 'axios';
import { PdfExportWrapper } from 'components/Quiz/PdfExportWrapper';
import config from 'lib/config';

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const quiz = await axios.get(
    `${config.backendUrl}/pdf/${id}/${config.puppeteerSecret}`
  );

  return {
    props: {
      quiz: JSON.parse(JSON.stringify(quiz.data)),
    },
  };
};

const PdfQuiz = ({ quiz }) => {
  return (
    <div>
      {quiz.slides.map((slide) => {
        return <PdfExportWrapper key={slide.id} slide={slide} />;
      })}
    </div>
  );
};

export default PdfQuiz;
