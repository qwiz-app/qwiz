import { createStyles, Group } from '@mantine/core';
import { ImageCard } from 'components/Cards/ImageCard';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.spacing.md,
  },
}));
const EventsPage = () => {
  const events = [
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      comments: 18,
      views: 434,
      link: 'https://beta.qwiz.party/',
    },
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      comments: 18,
      views: 434,
      link: 'https://beta.qwiz.party/',
    },
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      comments: 18,
      views: 434,
      link: 'https://beta.qwiz.party/',
    },
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      comments: 18,
      views: 434,
      link: 'https://beta.qwiz.party/',
    },
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      comments: 18,
      views: 434,
      link: 'https://beta.qwiz.party/',
    },
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      comments: 18,
      views: 434,
      link: 'https://beta.qwiz.party/',
    },
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      category: 'Food',
      title: 'Best event in town',
      author: 'Matijan Babečki',
      comments: 18,
      views: 434,
      link: 'https://beta.qwiz.party/',
    },
  ];

  const { classes } = useStyles();

  return (
    <HomepageLayout>
      <PageSection title="Near you">
        <div className={classes.grid}>
          {events.map((e, i) => (
            <ImageCard {...e} key={i} />
          ))}
        </div>
      </PageSection>
      {/* <h4>Events</h4>
      <Grid>
        {events.slice(0, 2).map((e, i) => (
          <Grid.Col key={i} span={4}>
            <EventCardImage {...e} />
          </Grid.Col>
        ))}
      </Grid> */}
    </HomepageLayout>
  );
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
