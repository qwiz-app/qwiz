export const paths = {
  home: () => '/',
  signIn: () => '/signin',
  register: () => '/register',
  explore: () => '/explore',
  events: () => '/events',
  eventsCreate: () => '/events/create',
  eventPage: (id: string) => `/events/${id}`,
  quiz: () => '/quiz',
  questionPacks: () => '/question-packs',
  teams: () => '/teams',
  stats: () => '/stats',
  leaderboard: () => '/learderboard',
};
