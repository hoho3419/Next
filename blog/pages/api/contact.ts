// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDatabase, inserDocument } from "@/lib/db-util";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (!email || !name || !message) {
      res.status(422).json({ name: "잘못된 입력입니다." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };
    let client;
    try {
      client = await connectDatabase();
      const result = await inserDocument(client, "contact", newMessage);
      res.status(201).json({ name: "데이터 저장 성공" });
    } catch (error) {
      res.status(500).json({ name: "데이터 저장 실패" });
    } finally {
      client?.close();
    }
  }
}
