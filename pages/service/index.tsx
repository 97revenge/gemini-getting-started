import jwt, { type Jwt } from "jsonwebtoken";
import "@/styles/globals.css";

import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Page({ response }: { response: any }) {
  return (
    <>
      <div className=" h-screen max-w-[1000-px] w-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-gray-200 to-sky-900">
        <div className="p-2 text-4xl text-center w-full py-12">
          resultado da pesquisa da sua redacao
        </div>
        <div className="w-full h-full flex items-start justify-center align-baseline">
          <div className="px-32 text-md font-semibold">{response}</div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const chat = ctx.req.cookies.chat;

  const response = jwt.verify(String(chat), String(process.env.JWT_TOKEN));

  return {
    props: {
      response,
    },
  };
};
