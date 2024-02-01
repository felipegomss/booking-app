import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function BookingItem() {
  return (
    <Card className="w-full">
      <CardContent className="p-5 grid grid-cols-3">
        <div className="space-y-2 col-span-2">
          <Badge className="bg-emerald-600 text-primary hover:bg-emerald-600">
            <p className="text-xs">Confirmado</p>
          </Badge>
          <h2 className="font-bold">Corte de Cabelo</h2>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src="https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <h3 className="text-sm text-muted-foreground">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l pl-5">
          <p className="text-sm text-muted-foreground">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm text-muted-foreground">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
}
