export interface AuthUserModel {
  id: string;
  email: string;
  fullName: string;
  password: string;
  confirmed: boolean;
  isAdmin: boolean;
}
