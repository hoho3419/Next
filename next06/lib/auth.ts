import { hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const hashPassword = await hash(password, 12); // 1. 암호화할 문자열 2. 암호화 강도
  return hashPassword;
};
