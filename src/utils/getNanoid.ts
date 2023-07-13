import { nanoid } from "nanoid";

export const getNanoid = (size: number = 10): string => {
  return nanoid(size);
};
