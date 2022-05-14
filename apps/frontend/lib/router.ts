export const isCurrentRoute = (pathname: string, route: string) =>
  pathname === route;

export const routeStartsWith = (pathname: string, route: string) => {
  if (route === '/') {
    return false;
  }
  return pathname.startsWith(route);
};

export const isActiveRoute = (pathname: string, route: string) =>
  isCurrentRoute(pathname, route) || routeStartsWith(pathname, route);
