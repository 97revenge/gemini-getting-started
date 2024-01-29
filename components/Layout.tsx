import { Card } from "./ui/card";

export default function LayoutDemo({ ...props }) {
  return (
    <>
      <Card className="bg-white" {...props}></Card>
    </>
  );
}
