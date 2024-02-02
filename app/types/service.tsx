import { Service } from "@prisma/client";

export interface ServiceItemProps {
  service: Service;
  isLogged?: boolean;
}
