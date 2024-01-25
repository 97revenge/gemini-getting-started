import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverDemo({ ...props }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Definir Temperatura</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Temperatura</h4>
            <p className="text-sm text-muted-foreground">
              Medida de energia térmica em dados.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="number">Valor</Label>
              <div {...props}></div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
