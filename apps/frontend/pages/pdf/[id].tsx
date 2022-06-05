import axios from 'axios';
import { PdfExportWrapper } from 'components/Quiz/PdfExportWrapper';
import config from 'lib/config';

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const slide = await axios.get(
    `${config.backendUrl}/pdf/${id}/${config.puppeteerSecret}`
  );

  return {
    props: {
      slide: JSON.parse(JSON.stringify(slide.data)),
    },
  };
};

const PdfQuiz = ({ slide }) => {
  return (
    <div style={{ position: 'relative', minHeight: '100%'}}>
      <PdfExportWrapper key={slide.id} slide={slide} />
    </div>
  );
};

export default PdfQuiz;
