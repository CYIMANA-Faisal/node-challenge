import * as bcrypt from 'bcrypt';

export const hash = async (plainText: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(plainText, salt);
  return hash;
};

export const compare = async (
  plainText: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hash);
};
