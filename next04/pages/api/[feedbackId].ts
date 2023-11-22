import type { NextApiRequest, NextApiResponse } from "next";
import { buildFeedbackPath, extractFeedback } from "./hello";

type Data = {
  id: string;
  email: string;
  text: string;
};
type Form = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Form>
) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const feedbackItem = feedbackData.find((el: Data) => el.id === feedbackId);
  res.status(202).json({ ...feedbackItem });
}
