import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import { EmailTemplate } from "@/components/email-template";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.query;

  const instance = jwt.verify(String(text), String(process.env.JWT_TOKEN));

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["empregos97@gmai.com"],
    subject: "aqui estã sua resacao",
    react: (
      <>
        <>
          <EmailTemplate />
        </>
      </>
    ),
  });
}
