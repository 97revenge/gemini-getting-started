import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

import "@/styles/globals.css";

import { usePDF } from "react-to-pdf";

import Markdown from "react-markdown";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Alert from "@/components/Alert";
import { BadgeDemo } from "@/components/Badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page({
  response,
  text,
}: {
  response: any;
  text: string;
}) {
  const route = useRouter();

  const { toPDF, targetRef } = usePDF({ filename: "IA_ENEM_REVISAO.pdf" });
  const markdown = `${response}`;

  const handleRegenerate = () => {
    route.back();
  };

  return (
    <>
      <div className=" h-[100%]  w-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-200 via-gray-200 to-sky-900">
        <div className="w-auto h-auto ">
          <div className="w-full h-full flex items-center justify-center  p-12">
            <Alert />
          </div>
          <div className="px-12 ">
            <Card className=" p-4 rounded-xl  text-xl bg-transparent ">
              <div
                ref={targetRef}
                className="h-auto bg-white p-2 border-transparent bg-sgradient-to-r from-gray-100 to-gray-200 rounded-xl gap-y-2"
              >
                <Markdown className={"p-2"}>{markdown}</Markdown>
              </div>
              <div className="w-full flex flex-col gap-y-2 items-center justify-center p-2">
                <Button
                  variant={"secondary"}
                  onClick={() => toPDF()}
                  className="hover:bg-red-500"
                >
                  Download PDF
                </Button>
                <Button variant={"link"} onClick={handleRegenerate}>
                  voltar ao inicio
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { text } = ctx.query;
  const response = jwt.verify(String(text), String(process.env.JWT_TOKEN), {
    ignoreExpiration: true,
  });

  return {
    props: {
      response,
      text,
    },
  };
};
