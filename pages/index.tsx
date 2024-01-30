import { CalendarIcon } from "@radix-ui/react-icons";

import { Box, Grommet } from "grommet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import "@/styles/globals.css";
import { Badge } from "@/components/ui/badge";

import { GetServerSideProps, GetServerSidePropsContext } from "next";

import dynamic from "next/dynamic";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { HoverCardDemo } from "@/components/Hover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

const CardDynamic = dynamic(() => import("../components/Card"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home({ data, query }: { data: any; query: any }) {
  const [state, setState] = useState<{ title: string; text: string }>({
    title: "",
    text: "",
  });

  const [tempState, setTempState] = useState<number>(0.2);

  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    route.push({
      pathname: "api/create",
      query: `title=${data.title}?text=${data.text}`,
    });
  };

  const [clipboardContent, setClipboardContent] = useState("");

  const handlePaste = async () => {
    try {
      // Read the text from the clipboard
      const textFromClipboard = await navigator.clipboard.readText();

      // Set the clipboard content in the component state
      setClipboardContent(textFromClipboard);

      // Do something with the pasted content
      console.log("Pasted content:", textFromClipboard);
    } catch (error) {
      console.error("Error reading from clipboard:", error);
    }
  };

  return (
    <>
      <Grommet full>
        <Box
          animation={{ delay: 450, duration: 450, type: "fadeIn" }}
          className="  flex h-screen w-full items-center justify-center bg-gray-100 bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-blue-500 to-white"
        >
          <div className=" h-[100%] flex flex-col sm:flex-row md:flex-row  items-center justify-center p-2  ">
            <div className="mx-auto max-w-screen-xl px-4  lg:flex lg:h-screen lg:items-center m-2 w-full rounded-2xl  ">
              <div className="mx-auto max-w-xl text-center shadow-lg rounded-xl">
                <div className="   justify-center   text-center py-6 xl:px-4 lg:px-4 md:px-4 sm:py-6   ">
                  <h2 className="bg-gradient-to-b from-blue-400 via-blue-500 to-sky-500 bg-clip-text text-2xl font-extrabold text-transparent sm:text-5xl ">
                    Correção do Enem pela {/*  {...} */}
                    <div>
                      <div className="flex w-full items-center justify-center align-baseline">
                        <Image
                          alt="gemini icon"
                          width={250}
                          height={250}
                          src={
                            "https://api.iconify.design/logos:google-gemini.svg"
                          }
                        />
                      </div>
                    </div>
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex h-screen  items-start xl:items-center lg:items-center ">
              <CardDynamic>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid w-full items-center gap-y-2 ">
                    <div className="flex flex-col ">
                      <Label htmlFor="title" className="p-1">
                        Titulo
                      </Label>
                      <Input
                        id="title"
                        className="shadow-sm"
                        {...register("title")}
                        placeholder="Titulo da  redação"
                        onChange={(e) =>
                          setState({
                            ...state,
                            title: e.target.value,
                          })
                        }
                      />
                      {state.title && (
                        <>
                          <div
                            className={
                              state.title.length < 30
                                ? "text-red-500"
                                : "text-green-500"
                            }
                          >
                            {state.title.length < 30
                              ? `${state.title.length} - Seu titulo tem poucas caracteres`
                              : `${state.title.length} - seu texto esta no padrao ENEM`}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="h-auto py-2 relative bottom-1"></div>
                  </div>
                  <div className="grid w-full gap-2">
                    <Textarea
                      className="shadow-sm"
                      placeholder="Cole sua redação aqui"
                      defaultValue={clipboardContent}
                      {...register("text")}
                      onChange={(e) =>
                        setState({
                          ...state,
                          text: e.target.value,
                        })
                      }
                    ></Textarea>
                    {state.text && (
                      <>
                        <div
                          className={
                            state.text.length < 500
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {state.text.length < 500
                            ? `${state.text.length} - Seu texto tem poucas caracteres`
                            : `${state.text.length} - seu texto esta no padrao ENEM`}
                        </div>
                      </>
                    )}
                    <div className="w-full h-12  flex items-start justify-start">
                      <Button
                        variant={"ghost"}
                        onClick={handlePaste}
                        size={"sm"}
                        type="button"
                      >
                        Colar Redação
                      </Button>
                    </div>

                    <Button size={"default"} type="submit">
                      Enviar
                    </Button>
                    {query?.error && (
                      <>
                        <div className="text-center text-red-800 font-bold text-md">
                          A requisição para a API @google-generative-ia não pôde
                          ser concluída com sucesso.
                        </div>
                      </>
                    )}
                  </div>
                </form>
              </CardDynamic>
            </div>
          </div>
        </Box>
        <div className="w-full   absolute  top-[93%] flex item-center justify-center">
          <HoverCardDemo>
            <Avatar>
              <AvatarImage src={data?.avatar_url} />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{data?.name}</h4>
              <h1 className=" text-sm ">
                O presente é deles; o futuro, para o qual eu realmente fiz a
                minha obra, é meu - <b>Nikola Tesla</b>
              </h1>
              <div className="flex flex-row  gap-x-2">
                <Badge>
                  <Link href={data?.blog}>Portfólio</Link>
                </Badge>
                <Image
                  width={25}
                  height={25}
                  src={"https://api.iconify.design/mdi:github.svg"}
                  alt="github icon"
                  onClick={() => route.push(data?.html_url)}
                />
              </div>
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />

                <span className="text-xs text-muted-foreground">
                  {data?.location}
                </span>
              </div>
            </div>
          </HoverCardDemo>
        </div>
      </Grommet>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await fetch("https://api.github.com/users/97revenge", {
    next: { revalidate: 3600 },
  });

  const query = ctx.query;

  const data = await response.json();

  return {
    props: {
      query,
      data,
    },
  };
};
