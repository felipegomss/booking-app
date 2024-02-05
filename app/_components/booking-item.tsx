import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { BookingProps } from "../types/booking";

export default function BookingItem({ booking, status }: BookingProps) {
  const { service, company, professional } = booking;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-full">
          <Card>
            <CardContent className="p-5 grid grid-cols-3">
              <div className="space-y-2 col-span-2 text-left">
                <Badge
                  className={`${
                    status === "CONFIRMADO"
                      ? "bg-emerald-600 text-primary hover:bg-emerald-700"
                      : ""
                  } opacity-50`}
                >
                  <p className="text-xs">{status}</p>
                </Badge>
                <h2 className="font-bold">{service.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {professional.name}
                </p>
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={company.imageUrl} />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <h3 className="text-sm text-muted-foreground">
                    {company.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-l pl-5">
                <p className="text-sm text-muted-foreground capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">{format(booking.date, "dd")}</p>
                <p className="text-sm text-muted-foreground">
                  {format(booking.date, "HH:mm")}
                </p>
              </div>
            </CardContent>
          </Card>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Informações do agendamento</SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
