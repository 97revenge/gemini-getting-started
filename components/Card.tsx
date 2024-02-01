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
    <Card className="xl:w-[700px] lg:w-[700px] md:w-[600px] sm:w-[200px] shadow-lg ">
      <CardHeader className="relative top-1">
        <CardTitle className="text-xl">Criar Correção </CardTitle>
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
