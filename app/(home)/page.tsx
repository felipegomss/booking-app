"user client";

import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { CompanyItemProps } from "../types/company";
import CompanyItem from "./_components/company-item";
import UserName from "./_components/display-username";
import Search from "./_components/search";
import "./_components/styles.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const getCompanies = await db.company.findMany({});
  const getNextBooking = await db.booking.findFirst({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: true,
      company: true,
      professional: true,
    },
  });

  const [companies, nextBooking] = await Promise.all([
    getCompanies,
    session?.user ? getNextBooking : {},
  ]);

  return (
    <>
      <Header />

      <div className="p-5">
        <UserName />
        <p className="capitalize text-sm text-muted-foreground">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="px-2 m-6 space-y-6">
        <Search />
        {session?.user ? (
          <div className="space-y-3">
            <h2 className="uppercase text-sm text-muted-foreground tracking-tight">
              próximo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <BookingItem
                booking={nextBooking}
                key={nextBooking.id}
                status="CONFIRMADO"
              />
            </div>
          </div>
        ) : (
          <></>
        )}
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
          <div className="flex gap-4 overflow-x-auto hidden-scroll">
            {companies.map((company: CompanyItemProps, index: number) => (
              <CompanyItem
                company={company}
                key={company.company?.id || index}
              />
            ))}
          </div>{" "}
        </div>
      </div>
    </>
  );
}
