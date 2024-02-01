import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { ServiceItemProps } from "@/app/types/service";
import Image from "next/image";
import React from "react";

import favicon from "@/app/favicon.ico";

export default function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card>
      <CardContent className="grid grid-cols-3 p-2 gap-6">
        <div className="relative h-28 w-full">
          <Image
            alt=""
            src={service?.imageUrl || favicon}
            fill
            className="object-cover rounded-xl w-full"
          />
        </div>

        <div className="col-span-2 flex flex-col justify-between">
          <div className="space-y-1">
            <h2 className="font-bold text-sm">{service.name}</h2>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(service.price)}
            </p>
            <Button className="rounded-xl">Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
