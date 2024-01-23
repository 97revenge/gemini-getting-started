import { RadioGroupDemo } from "@/components/RadioGroup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import "@/styles/globals.css";

import { GetServerSideProps } from "next";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const CardDynamic = dynamic(() => import("../components/Card"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  const [state, setState] = useState<string>("");

  const textAreaRef = useRef(null as any);
  const [pastedContent, setPastedContent] = useState("");

  const handlePaste = () => {
    navigator.clipboard.readText().then((clipboardContent) => {
      // Check if the textarea is available before setting the value
      if (textAreaRef.current) {
        textAreaRef.current.value = clipboardContent;
        setPastedContent(clipboardContent);
      }
    });
  };

  return (
    <>
      <div className="h-screen w-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-blue-600 to-sky-900">
        <div className="w-full h-full flex items-start justify-center pt-32">
          <CardDynamic>
            <form onClick={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-4 ">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Titulo</Label>
                  <Input id="title" placeholder="Titulo da  redação" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <RadioGroupDemo>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3">Compact</Label>
                    </div>
                  </RadioGroupDemo>
                </div>
              </div>
              <div className="grid w-full gap-2">
                <Textarea
                  placeholder="Cole sua redação aqui"
                  onChange={(e) => setState(e.target.value)}
                  ref={() => {
                    return handlePaste();
                  }}
                />
                {state && (
                  <>
                    <div
                      className={
                        state.length < 500 ? "text-red-500" : "text-green-500"
                      }
                    >
                      {state.length < 500
                        ? `${state.length} - Seu texto tem poucas caracteres`
                        : `${state.length} - seu texto esta no padrao ENEM`}
                    </div>
                  </>
                )}
                <Button size={"default"} type="submit">
                  Enviar
                </Button>
                <button onClick={handlePaste}>Paste Content</button>
              </div>
            </form>
          </CardDynamic>
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
