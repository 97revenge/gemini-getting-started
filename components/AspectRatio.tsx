import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function AspectRatioDemo({ ...props }) {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="bg-muted w-auto h-full p-4 rounded-xl"
      {...props}
    ></AspectRatio>
  );
}
