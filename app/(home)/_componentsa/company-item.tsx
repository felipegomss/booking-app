import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { CompanyItemProps } from "@/app/types/company";
import Image from "next/image";
import React from "react";

export default function CompanyItem({ company }: CompanyItemProps) {
  return (
    <Card className="max-w-[167px] min-w-[167px]">
      <CardContent className="p-0 flex flex-col justify-between h-full">
        <div className="relative w-full h-1/2">
          <Badge className="absolute top-1 left-1 z-50 opacity-50">
            <p className="uppercase text-xs ">{company?.category}</p>
          </Badge>
          <Image
            src={company?.imageUrl}
            alt={company?.imageUrl}
            width={167}
            height={100}
            className="w-full rounded-t-2xl h-full"
          />
        </div>
        <div className="p-2">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {company?.name}
          </h2>
          <p
            className="text-sm text-muted-foreground overflow-hidden text-ellipsis text-nowrap"
            title={company?.address}
          >
            {company?.address}
          </p>
          <Button className="w-full mt-3 rounded-lg">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
