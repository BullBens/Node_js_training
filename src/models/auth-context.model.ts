export interface AuthContextModel {
  id: string;
  login: string;
  email: string;
  type: number;
  photo: string | null;
  city: string;
  coins: number;
  classification: number;
  isAdmin: boolean;
  confirmed: boolean;
}
