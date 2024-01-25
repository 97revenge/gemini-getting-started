import { RadioGroupDemo } from "@/components/RadioGroup";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import "@/styles/globals.css";

import { GetServerSideProps } from "next";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Popover from "@/components/Popover";

const CardDynamic = dynamic(() => import("../components/Card"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  const [state, setState] = useState<{ title: string; text: string }>({
    title: "",
    text: "",
  });
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <div className=" h-[100%] w-[100%] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-gray-200 to-sky-900">
        <div className="  flex flex-col sm:flex-row md:flex-row  items-center justify-center ">
          <div className="   justify-center   text-center py-6 xl:px-4 lg:px-4 md:px-4 sm:py-6  ">
            <h2 className="text-3xl font-bold text-white md:text-3xl w-full">
              Correção do Enem pela {/*  {...} */}
              <div>
                <div className="flex w-full items-center justify-center align-baseline">
                  <Image
                    alt="gemini icon"
                    width={250}
                    height={250}
                    src={"https://api.iconify.design/logos:google-gemini.svg"}
                  />
                </div>
              </div>
            </h2>
          </div>
          <div className="flex h-screen  items-center relative bottom-16 xl:bottom-0 lg:bottom-0 md:bottom-0 ">
            <CardDynamic>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-y-2 ">
                  <div className="flex flex-col ">
                    <Label htmlFor="title" className="p-1">
                      Titulo
                    </Label>
                    <Input
                      id="title"
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
                  <div className="h-auto py-2 relative bottom-1">
                    <Popover>
                      <div className="flex flex-row w-[48px] gap-x-2 items-start justify-between align-baseline ">
                        <Button className="w-3 ml-2">+</Button>
                        <Input
                          id="number"
                          defaultValue=""
                          value={0.2}
                          {...register("temperature")}
                          className="w-12 h-8"
                        />
                        <Button className="w-3">-</Button>
                      </div>
                    </Popover>
                  </div>
                </div>
                <div className="grid w-full gap-2">
                  <Textarea
                    placeholder="Cole sua redação aqui"
                    {...register("text")}
                    onChange={(e) =>
                      setState({
                        ...state,
                        text: e.target.value,
                      })
                    }
                  />
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
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Aceito os termos e condições </Label>
                  </div>

                  <Button size={"default"} type="submit">
                    Enviar
                  </Button>
                </div>
              </form>
            </CardDynamic>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      hello: "ok",
    },
  };
};
