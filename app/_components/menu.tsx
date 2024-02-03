import {
  CalendarIcon,
  CircleUserIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Menu() {
  const { data, status } = useSession();
  const handleLogout = () => signOut();
  const handleLogin = () => signIn();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="text-left border-b p-5">
          <SheetTitle>booking.now</SheetTitle>
        </SheetHeader>
        <div className="py-5 px-6 space-y-3">
          {data?.user ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data.user?.image || ""} />
                </Avatar>
                <h2 className="font-bold">{data?.user.name}</h2>
              </div>
              <Button variant={"secondary"} size={"icon"}>
                <LogOutIcon onClick={handleLogout} />
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CircleUserIcon size={30} />
                <h2 className="font-bold">Olá, junte-se a nós!</h2>
              </div>
              <Button
                className="flex justify-start gap-3 p-2 px-6 w-full bg-secondary hover:bg-background text-primary"
                onClick={handleLogin}
              >
                <LogInIcon size={16} />
                <p className="text-sm">Fazer Login</p>
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Link href={"/"}>
              <Button className="flex justify-start gap-3 p-2 px-6 w-full bg-background hover:bg-background text-primary">
                <HomeIcon size={16} />
                <p className="text-sm">Início</p>
              </Button>
            </Link>

            <Link href={"/reservas"}>
              <Button className="flex justify-start gap-3 p-2 px-6 w-full bg-background hover:bg-background text-primary">
                <CalendarIcon size={16} />
                <p className="text-sm">Agendamentos</p>
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
