const { nanoid } = require("nanoid");

export const getNanoid = (random: number = 10): void => {
  return nanoid(random);
};
