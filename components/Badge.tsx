import { Badge } from "@/components/ui/badge";

export function BadgeDemo({ badge }: { badge: string }) {
  return (
    <Badge
      variant={"destructive"}
      className="w-[100px] h-auto flex items-center justify-center  text-md"
    >
      {badge}
    </Badge>
  );
}
