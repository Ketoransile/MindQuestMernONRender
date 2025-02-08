import bcrypt from "bcrypt";

export const hashPassword = async (passsword) => {
  const hashed = await bcrypt.hash(passsword, 10);
  return hashed;
};
export const correctPassword = async (password, hashedPassword) => {
  const correct = await bcrypt.compare(password, hashedPassword);
  return correct;
};
