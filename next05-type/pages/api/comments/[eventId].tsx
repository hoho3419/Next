import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import {
  connectDatabase,
  getAllDocument,
  inserDocument,
} from "@/helpers/db-util";

type Data = {
  message: string;
};

type ReqData = {
  id?: string;
  _id?: any;
  name: string;
  text: string;
  email?: string;
  message?: string;
  eventId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ReqData | ReqData[] | any>
) {
  // events라는 전체 섹션 안에 event와 comment가 있다.
  const eventId = req.query.eventId as string;
  const client = await connectDatabase();

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email || !name || !text) {
      res.status(422).json({ message: "Invalid data !! " });
      return;
    }

    const newData: ReqData = {
      email,
      name,
      text,
      eventId: eventId,
    };

    const result = await inserDocument(client, "comments", newData);
    // result에는 데이터베이스 연결정보와 임의로 삽입한 컬렉션에 id도 가지고 있다. result.insertedId
    newData._id = result.insertedId;

    console.log(result.insertedId);

    res.status(201).json({ ...newData, message: "성공" });
  }

  if (req.method === "GET") {
    const dum: ReqData[] = [
      { id: "c1", name: "MAX", text: "A first comment!" },
      { id: "c1", name: "MAX", text: "A first comment!" },
    ];
    // const db = client.db();
    // // {_id: -1} 특정 값 기준으로 음수면 내림차순 양수면 오름차순이다.
    // const document = await db
    //   .collection("comments")
    //   .find()
    //   .sort({ _id: -1 })
    //   .toArray();
    const document = await getAllDocument(client, "comments", { _id: -1 });

    res.status(201).json(document);
  }
  client.close();
}
