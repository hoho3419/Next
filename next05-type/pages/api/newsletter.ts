import { connectDatabase, inserDocument } from "@/helpers/db-util";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail) {
      // 422 상태코드는 사용자 입력이 잘못되었다는 의미
      res.status(422).json({ message: "Invalid email address " });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "데이터 베이스 연결 실패" });
      return;
    }

    try {
      const result = await inserDocument(client, "newsletter", userEmail);
      console.log(result);
    } catch (error) {
      res.status(500).json({ message: "데이터 베이스 저장 실패" });
      return;
    } finally {
      client.close();
    }

    res.status(201).json({ message: "성공" });
    // // 몽고디비를 npm 으로 설치 후 ho12 데이터 베이스 사용자 이름,968qQjp3Wa3rn1eu 비밀번호를 설정하고
    // // newsletter 데이터 베이스 이름을 생성한다 맞는 이름이 없을시 생성한다.
    // const client = await MongoClient.connect(
    //   `mongodb+srv://ho12:968qQjp3Wa3rn1eu@cluster0.hsue17f.mongodb.net/events?retryWrites=true&w=majority`
    // );
    // const db = client.db();
    // // newsletter라는 데이터베이스 안에 emails 이라는 컬럼을 생성하고  email: userEmail값을 넣는다.
    // await db.collection("newsletter").insertOne({ email: userEmail });
    // // 항상 데이터 베이스를 열고 닫아줘야 한다.
    // client.close();
  }
}
