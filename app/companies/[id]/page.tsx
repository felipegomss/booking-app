import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { CompanyDetailsProps } from "@/app/types/company";
import { ChevronLeftIcon, MapPinnedIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ServiceItem from "../_components/service-item";
import { ServiceItemProps } from "@/app/types/service";
import Menu from "@/app/_components/menu";
import Header from "../_components/header";

export default async function CompanyDetailsPage({
  params,
}: CompanyDetailsProps) {
  if (!params.id) return null;
  const company = await db.company.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });
  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Header />
        <Image
          src={company.imageUrl}
          fill
          alt={company.name}
          className="object-cover opacity-85"
        />
      </div>
      <div className="p-5 py-3 pb-6 border-b-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{company.name}</h1>
          <Badge className="">{company.category}</Badge>
        </div>
        <div className="flex gap-2 items-center">
          <MapPinnedIcon size={16} />
          <p className="text-sm text-muted-foreground">{company.address}</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5">
        {company.services.map((service: ServiceItemProps) => (
          <ServiceItem service={service} key={service?.service?.id} />
        ))}
      </div>
    </div>
  );
}
