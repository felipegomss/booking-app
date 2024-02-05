import {
  Company,
  Booking as PrismaBooking,
  Professional,
  Service,
} from "@prisma/client";

export type Booking = PrismaBooking & {
  service: Service;
  company: Company;
  professional: Professional;
};

export interface BookingProps {
  booking: Booking;
  status: BookingStatus;
}

export type BookingStatus = "CONFIRMADO" | "FINALIZADO";
