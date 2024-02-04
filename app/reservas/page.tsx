import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import { Booking } from "@prisma/client";

import { authOptions } from "../_lib/auth";

export default async function ReservasPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const getConfirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: true,
      company: true,
      professional: true,
    },
  });

  const getFinishedBookingsQue = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: true,
      company: true,
      professional: true,
    },
  });

  const [confirmedBookings, finishedBookings] = await Promise.all([
    getConfirmedBookings,
    getFinishedBookingsQue,
  ]);

  return (
    <>
      <Header />
      <main className="p-5 space-y-5">
        <div className="space-y-3">
          <h2 className="uppercase text-sm text-muted-foreground tracking-tight">
            confirmados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-3">
            {confirmedBookings.map((booking: Booking) => (
              <BookingItem
                booking={booking}
                key={booking?.id}
                status="CONFIRMADO"
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="uppercase text-sm text-muted-foreground tracking-tight">
            finalizados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-3">
            {finishedBookings.map((booking: Booking) => (
              <BookingItem
                booking={booking}
                key={booking?.id}
                status="FINALIZADO"
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
