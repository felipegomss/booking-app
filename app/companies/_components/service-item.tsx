"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { generateDayTimeList } from "@/app/_helpers/hours";
import favicon from "@/app/favicon.ico";
import { ProfessionalProps } from "@/app/types/professional";
import { ServiceItemProps } from "@/app/types/service";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useMemo, useState } from "react";

export default function ServiceItem({ service, isLogged }: ServiceItemProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<string | undefined>();
  const [worker, setWorker] = useState<ProfessionalProps | undefined>();

  const handleBooking = () => {
    isLogged ? console.log("Booked") : signIn();
  };

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    handleHourChange(undefined);
  };
  const handleHourChange = (hour: string | undefined) => {
    setHour(hour);
    setWorker(undefined);
  };

  const handleWorker = (workerId: string) => {
    setWorker((prevWorker) =>
      prevWorker === undefined
        ? { id: workerId, professional: undefined }
        : undefined
    );
  };

  return (
    <Card>
      <CardContent className="grid grid-cols-3 p-2 gap-6">
        <div className="relative h-28 w-full">
          <Image
            alt=""
            src={service?.imageUrl || favicon}
            fill
            className="object-cover rounded-xl w-full"
          />
        </div>

        <div className="col-span-2 flex flex-col justify-between">
          <div className="space-y-1">
            <h2 className="font-bold text-sm">{service.name}</h2>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(parseInt(service?.price))}
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-xl" onClick={handleBooking}>
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="p-0">
                <SheetHeader className="text-left border-b p-5">
                  <SheetTitle>Realizar agendamento</SheetTitle>
                </SheetHeader>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  locale={ptBR}
                  className="my-6"
                  fromDate={new Date()}
                  styles={{
                    head_cell: {
                      width: "100%",
                      textTransform: "capitalize",
                    },
                    cell: {
                      width: "100%",
                    },
                    button: {
                      width: "100%",
                    },
                    nav_button_previous: {
                      width: "32px",
                      height: "32px",
                    },
                    nav_button_next: {
                      width: "32px",
                      height: "32px",
                    },
                    caption: {
                      textTransform: "capitalize",
                    },
                  }}
                />
                {date && (
                  <div className="py-6 px-5 border-y overflow-x-auto flex gap-3">
                    {timeList.map((time) => (
                      <Button
                        className="rounded-full border"
                        variant={hour === time ? "default" : "outline"}
                        key={time}
                        onClick={() => handleHourChange(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {hour && (
                  <div className="py-6 px-5 border-y overflow-x-auto flex gap-3">
                    {service.serviceProfessionals.map(
                      ({ professional }: ProfessionalProps) => (
                        <Button
                          className="rounded-full border"
                          variant={
                            worker?.id === professional.id
                              ? "default"
                              : "outline"
                          }
                          key={professional.id}
                          onClick={() => handleWorker(professional?.id)}
                        >
                          {professional.name}
                        </Button>
                      )
                    )}
                  </div>
                )}

                {hour && (
                  <Card className="m-5">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <div className="flex items-center">
                            <p>
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(parseInt(service?.price))}
                            </p>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Data</p>
                        <p className="text-sm">
                          {format(date ? date : "", "dd 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Hora</p>
                        <p className="text-sm">{hour}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          Profissional
                        </p>
                        <p className="text-sm">
                          {worker
                            ? service.serviceProfessionals.find(
                                ({ professional }: ProfessionalProps) =>
                                  professional.id === worker?.id
                              )?.professional.name
                            : "Não selecionado"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <SheetFooter className="px-5">
                  <Button disabled={!hour}>Confirmar reserva</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
