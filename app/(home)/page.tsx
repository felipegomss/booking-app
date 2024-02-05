import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import CompanyItem from "./_components/company-item";
import UserName from "./_components/display-username";
import Search from "./_components/search";
import "./_components/styles.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { Booking } from "../types/booking";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const getCompanies = await db.company.findMany({});
  const bookings = await db.booking.findFirst({
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
    session?.user ? bookings : {},
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
        {session?.user && nextBooking ? (
          <div className="space-y-3">
            <h2 className="uppercase text-sm text-muted-foreground tracking-tight">
              próximo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <BookingItem
                booking={nextBooking as Booking}
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
            {companies?.map((company) => (
              <CompanyItem
                company={{
                  ...company,
                  services: [],
                  booking: [],
                  Professional: [],
                }}
                key={company?.id}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="uppercase text-sm text-muted-foreground tracking-tight">
            populares
          </h2>
          <div className="flex gap-4 overflow-x-auto hidden-scroll">
            {companies?.map((company) => (
              <CompanyItem
                company={{
                  ...company,
                  services: [],
                  booking: [],
                  Professional: [],
                }}
                key={company?.id}
              />
            ))}
          </div>{" "}
        </div>
      </div>
    </>
  );
}
