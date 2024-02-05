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
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Toaster } from "@/app/_components/ui/sonner";
import { generateDayTimeList } from "@/app/_helpers/hours";
import favicon from "@/app/favicon.ico";
import { ProfessionalProps } from "@/app/types/professional";
import { ServiceItemProps } from "@/app/types/service";
import { Booking } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format, set, setHours, setMinutes } from "date-fns";
import { ptBR, tr } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getDayBookings } from "../[id]/_actions/get-bookings";
import { saveBooking } from "../[id]/_actions/save-booking";

export default function ServiceItem({
  service,
  isLogged,
  company,
  serviceProfessional,
}: ServiceItemProps) {
  const { data } = useSession();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<string | undefined>();
  const [worker, setWorker] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const [serviceProfessionals, setServiceProfessionals] = useState<
    ProfessionalProps[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    if (!date) return;

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(date, company.id);

      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [company.id, date]);

  const handleBooking = () => {
    if (!isLogged) signIn();
  };

  useEffect(() => {
    if (service && serviceProfessional) {
      setServiceProfessionals(serviceProfessional);
    }
  }, [service]);

  const availableProfessionals = useMemo(() => {
    if (hour && dayBookings) {
      const selectedHour = parseInt(hour.split(":")[0]);
      const selectedMinutes = parseInt(hour.split(":")[1]);

      const unavailableProfessionals = dayBookings
        .filter((booking) => {
          const bookingDate = new Date(booking.date);
          const bookingHour = bookingDate.getHours();
          const bookingMinutes = bookingDate.getMinutes();

          return (
            bookingHour === selectedHour && bookingMinutes === selectedMinutes
          );
        })
        .map((booking) => booking.professionalId);

      const _availableProfessionals = serviceProfessionals.filter(
        (professional) =>
          !unavailableProfessionals.includes(professional.professional.id)
      );

      return _availableProfessionals;
    }

    return serviceProfessionals;
  }, [hour, dayBookings, serviceProfessionals]);

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

  const handleWorker = (workerId: string | undefined) => {
    setWorker(workerId);
  };

  const handleBookingConfirmation = async () => {
    setLoading(true);
    try {
      if (!date || !hour || !worker || !data?.user) return;

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking({
        companyId: company.id,
        serviceId: service.id,
        professionalId: worker,
        date: newDate,
        userId: (data?.user as any).id,
      });
      setDate(undefined);
      setHour(undefined);
      toast("Reserva criada com sucesso!", {
        description: format(newDate, "'Para dia' dd 'de' MMMM, 'às' HH:mm", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/reservas"),
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
              }).format(Number(service?.price))}
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
                    caption_start: {
                      width: "100%",
                    },
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
                    {timeList?.map((time) => (
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

                {hour && date && (
                  <div className="py-6 px-5 border-y overflow-x-auto flex gap-3">
                    {availableProfessionals.length > 0 ? (
                      availableProfessionals.map(
                        ({ professional }: ProfessionalProps) => {
                          return (
                            <Button
                              className="rounded-full border"
                              variant={
                                worker === professional.id
                                  ? "default"
                                  : "outline"
                              }
                              key={professional.id}
                              onClick={() => handleWorker(professional?.id)}
                            >
                              {professional.name}
                            </Button>
                          );
                        }
                      )
                    ) : (
                      <div>
                        <h3 className="scroll-m-20 font-semibold tracking-tight">
                          Nenhum profissional disponível.
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Por favor, selecione outro horário!
                        </p>
                      </div>
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
                              }).format(Number(service?.price))}
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
                      </div>{" "}
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          Profissional
                        </p>
                        <p className="text-sm">
                          {worker
                            ? serviceProfessional.find(
                                (professional) =>
                                  professional.professionalId === worker
                              )?.professional.name
                            : "Não selecionado"}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Local</p>
                        <p className="text-sm">{company.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <SheetFooter className="p-5">
                  <SheetClose asChild>
                    <Button
                      disabled={!hour || !worker || loading}
                      onClick={handleBookingConfirmation}
                      className="w-full"
                    >
                      {loading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar reserva
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
}
