import { Badge } from "@/app/_components/ui/badge";
import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CompanyDetailsProps } from "@/app/types/company";
import { ServiceItemProps } from "@/app/types/service";
import { MapPinnedIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import Header from "../_components/header";
import ServiceItem from "../_components/service-item";

export default async function CompanyDetailsPage({
  params,
}: CompanyDetailsProps) {
  if (!params.id) return null;
  const company = await db.company?.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: {
        include: {
          serviceProfessionals: {
            include: {
              professional: true,
            },
          },
        },
      },
    },
  });

  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Header />
        <Image
          src={company?.imageUrl}
          fill
          alt={company?.name}
          className="object-cover opacity-85"
        />
      </div>
      <div className="p-5 py-3 pb-6 border-b-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{company?.name}</h1>
          <Badge className="opacity-50">{company?.category}</Badge>
        </div>
        <div className="flex gap-2 items-center">
          <MapPinnedIcon size={16} />
          <p className="text-sm text-muted-foreground">{company?.address}</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5">
        {company?.services.map((service: ServiceItemProps, index: number) => {
          return (
            <ServiceItem
              company={company}
              service={service}
              key={index}
              isLogged={session?.user ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
}
