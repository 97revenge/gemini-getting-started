import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function Custom504() {
  const router = useRouter();
  return (
    <>
      <section className="py-6 dark:bg-violet-400 dark:text-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leadi text-center text-blue-500">
            Não era para isto acontecer 😢 ...
          </h1>
          <p className="pt-2 pb-8 text-xl font-medium text-center text-blue-500">
            Requisições com mais de 10 segundos podem ser demoradas demais e nao
            ser concluidas.
            <b className="hover:underline">
              Se quiser que sua correção seja concluida, atualize a página. {""}
            </b>
            se quiser editar sua redação, volte ao inicio.
          </p>
          <Button
            variant={"default"}
            size={"lg"}
            className="px-8 py-3 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-50"
            onClick={() => router.reload()}
          >
            Atualizar a tela
          </Button>
          <Button variant={"link"} onClick={() => router.back()}>
            voltar ao inicio
          </Button>
        </div>
      </section>
    </>
  );
}
