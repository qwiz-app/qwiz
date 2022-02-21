export const cookiesToObj = (cookies: string) =>
  cookies
    ?.split('; ')
    .filter(Boolean)
    .map((s) => s.split('='))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) ?? {};

export const getFromCookie = (cookies: string, field: string) => {
  const obj = cookiesToObj(cookies);
  return obj[field] ?? null;
};