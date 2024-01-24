import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardWithForm({ ...props }) {
  return (
    <Card className="xl:w-[800px] lg:w-[800px] md:w-[400px] sm:w-[200px] ">
      <CardHeader className="relative top-1">
        <CardTitle className="text-xl">Criar texto</CardTitle>
        <CardDescription className="text-xl">
          Correção de texto do Enem pela Gemini IA 🚀
        </CardDescription>
      </CardHeader>
      <CardContent
        className="h-auto rounded-b-xl  flex  flex-col justify-between"
        {...props}
      ></CardContent>
    </Card>
  );
}
