import { Button } from "@/components/ui/button";
import Link from "next/link";
import "@/styles/globals.css";

export default function page() {
  const toOrigin = () => {
    window.location.href = location.origin;
  };

  return (
    <>
      <section className="py-6 dark:bg-violet-400 dark:text-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leadi text-center text-blue-500">
            Sua correção foi enviada ao seu E-mail !
          </h1>
          <p className="pt-2 pb-8 text-xl font-medium text-center text-blue-500">
            Sua correção de redação do enem passou por processos de{" "}
            <b className="hover:underline">
              revisão, adição de prompt e formatação enquanto trazia sua
              resposta
            </b>
            . Seja livre para re-fazer sua busca com a mesma redação ou com
            outras redações.
          </p>
          <Button
            variant={"default"}
            size={"lg"}
            className="px-8 py-3 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-50"
          >
            <Link href={"https://github.com/97revenge/gemini-getting-started"}>
              Deixe sua 🌟 no Github
            </Link>
          </Button>
          <Button variant={"link"} onClick={toOrigin}>
            voltar ao inicio
          </Button>
        </div>
      </section>
    </>
  );
}
