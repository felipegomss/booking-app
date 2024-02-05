import {
  Company,
  Professional,
  Service,
  ServiceProfessional,
} from "@prisma/client";

type ExtendedServiceProfessional = ServiceProfessional & {
  professional: Professional;
};

export interface ServiceItemProps {
  service: Service;
  isLogged?: boolean;
  company: Company;
  serviceProfessional: ExtendedServiceProfessional[];
}
