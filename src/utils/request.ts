import HttpError from '../errors/HttpError';

export const parseId = (value: string | string[] | undefined, name = 'id'): number => {
  if (Array.isArray(value)) {
    throw new HttpError(400, `Invalid ${name}`);
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new HttpError(400, `Invalid ${name}`);
  }

  return parsed;
};
