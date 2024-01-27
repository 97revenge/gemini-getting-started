import { CalendarIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function HoverCardDemo({ ...props }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <Button variant="link">@97revenge</Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4" {...props}></div>
      </HoverCardContent>
    </HoverCard>
  );
}
