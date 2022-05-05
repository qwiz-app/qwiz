import { QuizCard } from 'components/Cards/QuizCard';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useCurrentUserInfo } from 'hooks/api/users';
import { useEffect, useState } from 'react';

const QuizPage = () => {
  const { data: author } = useCurrentUserInfo();

  const events = [
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      title: 'Best event in town',
      author,
      link: '/',
      published: false,
    },
    {
      image: 'https://www.klikcup.com/images/objects/136/262.jpg',
      title: 'Best event in town',
      author,
      link: '/',
      published: true,
    },
    {
      image:
        'https://www.harpcoventgarden.com/-/media/sites/microsites/h/the-harp-_-p180/images/2021/carousel/dsc_5650.ashx?w=1024',
      title: 'Best event in town',
      author,
      link: '/',
      published: false,
    },
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author,
      link: '/',
      published: true,
    },
    {
      image:
        'https://ichef.bbci.co.uk/news/1024/cpsprodpb/076A/production/_119289810_qq1200-gettyimages-1318536779.jpg',
      title: 'Best event in town',
      author,
      link: '/',
      published: true,
    },
    {
      image:
        'https://media.istockphoto.com/photos/people-talking-and-toasting-in-a-pub-with-the-beers-picture-id1091469178?k=20&m=1091469178&s=612x612&w=0&h=bsu2Pdpx8EOm3uEcesThaxlQO9PpNrDKbeLVrjBNMfg=',
      title: 'Best event in town',
      author,

      link: '/',
      published: true,
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <HomepageLayout>
      <PageSection
        title="Recently edited"
      >
        <PageGrid type="tiny">
          {events.map((e, i) => (
            <QuizCard key={i} {...e} loading={loading} />
          ))}
        </PageGrid>
      </PageSection>
    </HomepageLayout>
  );
};

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
