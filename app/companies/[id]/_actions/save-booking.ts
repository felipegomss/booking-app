"use server";

import { db } from "@/app/_lib/prisma";
import { SaveBookingParams } from "@/app/types/save-booking";

export const saveBooking = async (params: SaveBookingParams) => {
  await db.booking.create({
    data: {
      date: new Date(params.date),
      serviceId: params.serviceId,
      userId: params.userId,
      professionalId: params.professionalId,
      companyId: params.companyId,
    },
  });
};
