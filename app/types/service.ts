import { Company, Service } from "@prisma/client";

export interface ServiceItemProps {
  service: Service;
  isLogged?: boolean;
  company: Company;
}
