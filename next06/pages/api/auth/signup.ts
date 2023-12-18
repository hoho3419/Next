// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@/lib/auth";
import { connectDatabase } from "@/lib/db-util";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserToken>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
      res
        .status(422)
        .json({ message: "이메일과 비밀번호의 입력값이 유효하지 않습니다." });
      return;
    }
    const client = await connectDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "이미 있는 이메일 입니다." });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });
    client.close();
    res.status(201).json({ message: "계정 생성을 완료했습니다." });
  }

  // res.status(200).json({ message: "John Doe" });
}
