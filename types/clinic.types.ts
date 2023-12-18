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
