import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import "@/styles/globals.css";

import { usePDF } from "react-to-pdf";

import Markdown from "react-markdown";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "@/components/ui/button";
import AlertDemo from "@/components/Alert";
import { useState } from "react";
import { Grommet, Box } from "grommet";

export default function Page({
  response,
  status,
  text,
}: {
  response: any;
  status: any;
  text: any;
}) {
  "use client";
  const route = useRouter();

  const { toPDF, targetRef } = usePDF({ filename: "IA_ENEM_REVISAO.pdf" });
  const markdown = `${response}`;

  const [value, setValue] = useState<string>(text);

  const handleRegenerate = () => {
    route.back();
  };
  (function starter() {
    status == !200 &&
      route.push({
        pathname: "/",
        query: "error=voce teve um erro ",
      });
  })();

  const [email, setEmail] = useState<string>("");

  const handleText = (e: any) => {
    e.preventDefault();
    route.push({
      pathname: "/api/send",
      query: `text=${text}&email=${email}`,
    });
  };

  return (
    <>
      <Grommet full>
        <Box animation={{ delay: 450, duration: 450, type: "fadeIn" }}>
          <div className=" h-[100%]  w-screen  bg-gray-100 bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-blue-500 to-white">
            <div className="w-auto h-auto ">
              <div className="w-full h-full flex items-center justify-center  p-12   ">
                <AlertDemo>
                  <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
                    <input
                      placeholder="Email"
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-3 text-blue-900 transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline"
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    />
                    <HoverCard>
                      <HoverCardTrigger>
                        <Button
                          variant={"default"}
                          size={"lg"}
                          className="hover:bg-green-500 bg-red-500 "
                          onClick={handleText}
                          disabled
                        >
                          {" "}
                          Indisponivel no momento
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="text-sm">
                        O dominio de E-mails da aplicação ainda nao foi
                        verificado. esta funcionalidade ficará disponivel em
                        mais ou menos 72 horas
                      </HoverCardContent>
                    </HoverCard>
                  </form>
                  <p className="max-w-md mb-10 text-xs tracking-wide text-blue-900 sm:text-sm sm:mx-auto md:mb-16">
                    Envie sua correção direto para o seu Email. Todos os acessos
                    de privacidade respeitados.
                  </p>
                  <div className="w-full  flex items-center justify-center">
                    <Button
                      variant={"secondary"}
                      onClick={() => toPDF()}
                      className="hover:bg-red-500"
                      size={"lg"}
                    >
                      Baixe a correção da redação
                    </Button>
                  </div>
                </AlertDemo>
              </div>
              <div className="p-12 ">
                <div className="bg-gray-100 rounded-md" ref={targetRef}>
                  <span className="relative flex justify-center py-2">
                    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

                    <span className="relative z-10 bg-white px-6"></span>
                  </span>
                  <Markdown className="p-4 ">{markdown}</Markdown>
                  <span className="relative flex justify-center py-2">
                    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

                    <span className="relative z-10 bg-white px-6"></span>
                  </span>
                </div>
                <div className="w-full  gap-y-2 items-center pl-[40%]  p-2  rounded-xl w-auto ">
                  <div className="flex flex-col w-[30%] flex item-center justify-center">
                    <Button variant={"link"} onClick={handleRegenerate}>
                      voltar ao inicio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Grommet>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { text, status } = ctx.query;

  console.log({ text: text, status: status });
  const response = await jwt.verify(
    String(text),
    String(process.env.JWT_TOKEN),
    {
      ignoreExpiration: true,
    }
  );

  return {
    props: {
      status,
      response,
      text,
    },
  };
};
