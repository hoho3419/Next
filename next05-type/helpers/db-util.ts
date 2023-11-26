import { MongoClient } from "mongodb"; // 몽고DB(mongodb)는 key와 value 쌍을 가지고 데이터를 저장하는 데이터 베이스

/* 몽고DB랑 연결하는 구문 */
export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://ho12:968qQjp3Wa3rn1eu@cluster0.hsue17f.mongodb.net/events?retryWrites=true&w=majority`
  );
  return client;
};
/* DB를 가져오고 컬렉션(DB 컬럼)에 데이터 넣는 구문 */
export const inserDocument = async (
  client: MongoClient,
  collection: string,
  document: any
) => {
  const db = client.db();
  // newsletter라는 데이터베이스 안에 emails 이라는 컬럼을 생성하고  email: userEmail값을 넣는다.
  const result = await db.collection(collection).insertOne({ email: document });
  return result;
};

export const getAllDocument = async (
  client: MongoClient,
  collection: string,
  sort: any
) => {
  const db = client.db();

  // {_id: -1} 특정 값 기준으로 음수면 내림차순 양수면 오름차순이다.
  const document = await db.collection(collection).find().sort(sort).toArray();
  return document;
};
