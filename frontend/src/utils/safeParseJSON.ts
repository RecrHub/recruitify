export const safeParseJSON = <T = Record<string, unknown>>(text?: string) => {
  if (typeof text !== 'string') return;

  let json: T;
  try {
    json = JSON.parse(text);
  } catch {
    return;
  }

  return json;
};
