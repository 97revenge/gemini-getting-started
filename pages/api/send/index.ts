import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import { EmailTemplate } from "@/components/email-template";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, email } = req.query;

  const instance = jwt.verify(String(text), String(process.env.JWT_TOKEN));

  const { data, error } = await resend.emails.send({
    from: "ENEM with Gemini IA <onboarding@resend.dev>",
    to: email as string,
    subject: "SUA REDAÇÃO CORRIGIDA PELA GEMINI IA JÁ CHEGOU !!! 🤖",
    react: EmailTemplate({ markdown: instance }) as string,
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).redirect(`/email`);
}
