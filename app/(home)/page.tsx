import Image from "next/image";
import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_componentsa/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import CompanyItem from "./_componentsa/company-item";
import { CompanyItemProps } from "../types/barbershop";

import "./_componentsa/styles.css";

export default async function Home() {
  const companies = await db.company.findMany({});

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
        <p className="capitalize text-sm text-muted-foreground">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="px-2 m-6 space-y-6">
        <Search />
        <div className="space-y-3">
          <h2 className="uppercase text-sm text-muted-foreground tracking-tight">
            agendamentos
          </h2>
          <BookingItem />
        </div>
        <div className="space-y-3">
          <h2 className="uppercase text-sm text-muted-foreground tracking-tight">
            recomendados
          </h2>
          <div className="flex gap-4 overflow-x-auto hidden-scroll">
            {companies.map((company: CompanyItemProps, index: number) => (
              <CompanyItem
                company={company}
                key={company.company?.id || index}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="uppercase text-sm text-muted-foreground tracking-tight">
            populares
          </h2>
          <BookingItem />
        </div>
      </div>
    </>
  );
}
