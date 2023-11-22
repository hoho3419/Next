// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  id: string;
  email: string;
  text: string;
};
type Form = {
  name: string;
};

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedback = (filePath: string) => {
  const fileData = fs.readFileSync(filePath);
  // 파일경로에 데이터를 JSON.parse로 파싱한다
  const data = JSON.parse(fileData.toString());
  return data;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Form>
) {
  try {
    if (req.method === "POST") {
      const email = req.body.email;
      const formText = req.body.formText;

      const newFeedback = {
        id: new Date().toISOString(),
        email: email,
        text: formText,
      };
      // process.cwd()로 절대경로에 접근한다음 두번째인자인 data 경로를 설정해주고 세번째로 읽을 파일의 이름을 적는다.
      // const filepath = path.join(process.cwd(), "data", "feedback.json")
      // const fileData = fs.readFileSync(filepath);
      // 파일경로에 데이터를 JSON.parse로 파싱한다
      // const data = JSON.parse(fileData.toString());
      // data 배열에 데이터를 넣고

      const filepath = buildFeedbackPath();
      const data = extractFeedback(filepath);
      // 전체 파일을 읽는다.
      data.push(newFeedback);
      // writeFileSync를 통해서 filepath 경로를 넣고 JSON.stringify 문자열로 변환시킨 후 다시 저장한다.
      fs.writeFileSync(filepath, JSON.stringify(data));
      // 200과는 다르게 201 를 보내면서 데이터 저장이 성공적으로 완료됐다고 표시
      res.status(201).json({ name: "Feedback data saves succese" });
    } else {
      const filepath = buildFeedbackPath();
      const data = extractFeedback(filepath);
      res.status(200).json({ name: data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ name: "Error reading feedback  file" });
  }
}
