import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { CompanyItemProps } from "@/app/types/barbershop";
import Image from "next/image";
import React from "react";

export default function CompanyItem({ company }: CompanyItemProps) {
  return (
    <Card className="min-w-[167px] max-w-[167px]">
      <CardContent className="p-0 flex flex-col justify-between h-full">
        <Image
          src={company.imageUrl}
          alt={company.imageUrl}
          width={200}
          height={200}
          className="w-full rounded-t-2xl"
        ></Image>
        <div className="p-2">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {company.name}
          </h2>
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis text-nowrap">
            {company.address}
          </p>
          <Button className="w-full mt-3 rounded-lg">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
