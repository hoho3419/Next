// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === "POST"){
    const { email,name,message } = req.body;

    if(!email || !name || !message){
      res.status(422).json({ name: "잘못된 입력입니다."})
      return;
    }

    const newMessage = {
      email,
      name,
      message
    };
    console.log(newMessage);
    res.status(201).json({name: "데이터 전송 성공"})
  }

  res.status(200).json({ name: 'John Doe' })
}
