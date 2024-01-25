import jwt from "jsonwebtoken";

import "@/styles/globals.css";

import Markdown from "react-markdown";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Alert from "@/components/Alert";
import { BadgeDemo } from "@/components/Badge";
import { Card } from "@/components/ui/card";

export default function Page({ response }: { response: any }) {
  const markdown = `${response}`;
  return (
    <>
      <div className=" h-[100%]  w-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-200 via-gray-200 to-sky-900">
        <div className="w-auto h-auto ">
          <div className="w-full h-full flex items-center justify-center  p-12">
            <Alert />
          </div>
          <div className="px-12 ">
            <Card className=" p-4 rounded-xl  text-xl bg-transparent ">
              <div className="p-2">
                <BadgeDemo badge="normal" />
              </div>
              <div className="h-auto bg-white p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl gap-y-2">
                <Markdown>{markdown}</Markdown>
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
  const response = jwt.verify(String(text), String(process.env.JWT_TOKEN));

  return {
    props: {
      response,
    },
  };
};
