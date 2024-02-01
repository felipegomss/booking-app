import {
  Company as PrismaCompany,
  Service,
  Booking,
  Professional,
} from "@prisma/client";

type Company = PrismaCompany & {
  services: Service[];
  booking: Booking[];
  Professional: Professional[];
};

export interface CompanyItemProps {
  company: Company;
}

export interface CompanyDetailsProps {
  params: {
    id?: string;
  };
}
