import { Booking } from "@prisma/client";

export interface BookingProps {
  booking: Booking;
  status: BookingStatus;
}

export type BookingStatus = "CONFIRMADO" | "FINALIZADO";
