import { Grid } from '@mantine/core';
import { EventCardImage } from 'components/Cards/EventCardImage';
import { ImageCard } from 'components/Cards/ImageCard';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useEffect, useState } from 'react';

const EventsPage = () => {
  const events = [
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      teams: 22,
      currency: '$',
      price: 8,
      link: '/',
    },
    {
      image: 'https://www.klikcup.com/images/objects/136/262.jpg',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      teams: 22,
      currency: '$',
      price: 8,
      link: '/',
    },

    {
      image:
        'https://www.harpcoventgarden.com/-/media/sites/microsites/h/the-harp-_-p180/images/2021/carousel/dsc_5650.ashx?w=1024',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      teams: 22,
      currency: '$',
      price: 8,
      link: '/',
    },
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      teams: 22,
      currency: '$',
      price: 8,
      link: '/',
    },
    {
      image:
        'https://ichef.bbci.co.uk/news/1024/cpsprodpb/076A/production/_119289810_qq1200-gettyimages-1318536779.jpg',
      category: 'Fun',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      teams: 16,
      currency: '$',
      price: 6,
      link: '/',
    },

    {
      image:
        'https://media.istockphoto.com/photos/people-talking-and-toasting-in-a-pub-with-the-beers-picture-id1091469178?k=20&m=1091469178&s=612x612&w=0&h=bsu2Pdpx8EOm3uEcesThaxlQO9PpNrDKbeLVrjBNMfg=',
      category: 'Drinks',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      teams: 24,
      currency: '$',
      price: 14,
      link: '/',
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <HomepageLayout>
      {/* TODO: highlighted event */}
      {/* <PageSection>
        <EventBanner />
      </PageSection> */}
      <PageSection title="Events">
        <Grid>
          {events.slice(0, 3).map((e, i) => (
            <Grid.Col key={i} span={4}>
              <EventCardImage {...e} />
            </Grid.Col>
          ))}
        </Grid>
      </PageSection>
      <PageSection
        title="Near you"
        description="Consequatur aut repellat dolores distinctio quo voluptas minima et."
      >
        <PageGrid type="tiny">
          {events.map((e, i) => (
            <ImageCard key={i} {...e} loading={loading} />
          ))}
        </PageGrid>
      </PageSection>
    </HomepageLayout>
  );
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
