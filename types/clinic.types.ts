export interface IClinicInfo {
  users: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  role: {
    id: number;
    name: string;
  };
  isOwner: boolean;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IClinicCreate {
  name: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  description: string;
  planId: string;
}
