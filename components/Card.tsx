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
    <Card className="sm:w-[800px] h-auto w-[430px]   ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent
        className="h-auto rounded-b-xl  flex gap-y-8 flex-col justify-between"
        {...props}
      ></CardContent>
    </Card>
  );
}
