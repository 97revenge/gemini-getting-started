import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <Alert className="w-[45%] bg-transparent">
      <RocketIcon className="object-fill h-12 h-6" />
      <AlertTitle className="text-3xl">Heads up!</AlertTitle>
      <AlertDescription className="text-3xl">
        Está é a correção da sua redação 🤖
      </AlertDescription>
    </Alert>
  );
}
